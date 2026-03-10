<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AureaAIController extends Controller
{
    public function ask(Request $request)
    {
        $request->validate([
            'question'     => 'required|string|max:1000',
            'risk_profile' => 'nullable|string',
            'account_type' => 'nullable|string',
            'goals'        => 'nullable|string',
        ]);

        $apiKey = config('services.gemini.key');

        if (empty($apiKey)) {
            return response()->json([
                'error' => 'AI service is not configured. Please add your GEMINI_API_KEY to the .env file.',
            ], 503);
        }

        $riskProfile = $request->risk_profile ?? 'moderate';
        $accountType = $request->account_type ?? 'individual';
        $goals       = $request->goals         ?? 'wealth';

        $systemPrompt = "You are Aurea AI, an expert investment advisor for Aurea Octave — a premium investment management platform specializing in cryptocurrencies, ETFs, tokenized assets, and portfolio management.\n\n"
            . "Client Profile:\n"
            . "- Risk Profile: {$riskProfile} (conservative = capital preservation, moderate = balanced growth, aggressive = maximum growth)\n"
            . "- Account Type: {$accountType} (individual / IRA / 401k / trust)\n"
            . "- Investment Goals: {$goals} (retirement / wealth accumulation / education / income generation)\n\n"
            . "Guidelines:\n"
            . "- Provide clear, professional, and actionable investment advice tailored to the client profile above.\n"
            . "- Use markdown formatting (headers, bullet points, bold) to structure responses clearly.\n"
            . "- Cover topics like portfolio allocation, market trends, risk management, crypto, ETFs, and tokenized assets.\n"
            . "- Always include a brief risk disclaimer when recommending specific assets.\n"
            . "- Keep responses focused and under 400 words unless more detail is needed.\n"
            . "- Never promise guaranteed returns or predict exact prices.";

        try {
            $response = Http::timeout(30)
                ->withHeaders(['Content-Type' => 'application/json'])
                ->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}", [
                    'system_instruction' => [
                        'parts' => [['text' => $systemPrompt]],
                    ],
                    'contents' => [
                        [
                            'role'  => 'user',
                            'parts' => [['text' => $request->question]],
                        ],
                    ],
                    'generationConfig' => [
                        'maxOutputTokens' => 700,
                        'temperature'     => 0.7,
                    ],
                ]);

            if ($response->successful()) {
                $data    = $response->json();
                $content = $data['candidates'][0]['content']['parts'][0]['text'] ?? '';
                return response()->json(['response' => $content]);
            }

            Log::error('Gemini API Error', [
                'status' => $response->status(),
                'body'   => $response->body(),
            ]);

            $status      = $response->status();
            $userMessage = match(true) {
                $status === 400 => 'Invalid request sent to AI service. Please try again.',
                $status === 401,
                $status === 403 => 'AI service authentication failed. Please check your GEMINI_API_KEY.',
                $status === 429 => 'AI service rate limit reached. Please wait a moment and try again.',
                $status >= 500  => 'AI service is temporarily unavailable. Please try again later.',
                default         => 'Failed to get a response from the AI service.',
            };

            return response()->json(['error' => $userMessage], 503);

        } catch (\Illuminate\Http\Client\ConnectionException $e) {
            Log::error('Gemini Connection Error', ['message' => $e->getMessage()]);

            return response()->json([
                'error' => 'Unable to reach the AI service. Please check your internet connection.',
            ], 503);

        } catch (\Exception $e) {
            Log::error('Gemini Exception', [
                'message' => $e->getMessage(),
                'trace'   => $e->getTraceAsString(),
            ]);

            return response()->json([
                'error' => 'An unexpected error occurred. Please try again.',
            ], 500);
        }
    }
}
