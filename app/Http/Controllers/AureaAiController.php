<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AureaAiController extends Controller
{
    public function chat(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'messages' => ['required', 'array', 'min:1', 'max:12'],
            'messages.*.role' => ['required', 'in:user,ai'],
            'messages.*.content' => ['required', 'string', 'max:4000'],
        ]);

        $apiKey = config('services.gemini.api_key');

        if (!$apiKey) {
            return response()->json([
                'message' => 'Gemini API key is not configured.',
            ], 500);
        }

        $contents = collect($validated['messages'])
            ->map(fn (array $message) => [
                'role' => $message['role'] === 'ai' ? 'model' : 'user',
                'parts' => [
                    ['text' => $message['content']],
                ],
            ])
            ->values()
            ->all();

        try {
            $response = Http::timeout(45)
                ->acceptJson()
                ->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key='.$apiKey, [
                    'system_instruction' => [
                        'parts' => [
                            [
                                'text' => 'You are Aurea AI, Aurea Octave\'s financial assistant. Give concise, helpful, educational answers about investing, portfolio planning, retirement planning, and market context. Do not claim access to private account data or real-time market data unless the user provided it. Avoid guarantees, predictions presented as certainty, or regulated financial advice. When appropriate, suggest consulting a licensed financial advisor for personalized decisions.',
                            ],
                        ],
                    ],
                    'contents' => $contents,
                    'generationConfig' => [
                        'temperature' => 0.7,
                        'topK' => 40,
                        'topP' => 0.95,
                        'maxOutputTokens' => 800,
                    ],
                ]);

            if (!$response->successful()) {
                return response()->json([
                    'message' => data_get($response->json(), 'error.message', 'Gemini request failed.'),
                ], $response->status());
            }

            $reply = collect(data_get($response->json(), 'candidates', []))
                ->flatMap(fn (array $candidate) => data_get($candidate, 'content.parts', []))
                ->pluck('text')
                ->filter()
                ->implode("\n\n");

            if (blank($reply)) {
                return response()->json([
                    'message' => 'Gemini returned an empty response.',
                ], 502);
            }

            return response()->json([
                'reply' => $reply,
            ]);
        } catch (\Throwable $exception) {
            report($exception);

            return response()->json([
                'message' => 'Unable to reach Gemini right now. Please try again shortly.',
            ], 500);
        }
    }
}