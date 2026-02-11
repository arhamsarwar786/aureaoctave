<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ForexController extends Controller
{
    public function getForexData(Request $request)
    {
        $fromCurrency = $request->query('from');
        $toCurrency = $request->query('to');
        $apiKey = env('CURRENCYLAYER_API_KEY'); // Store your API key in .env file
        $apiKey = "DGYDWDYSXTOHNLTA"; // Store your API key in .env file

        try {
            $response = Http::timeout(30)->retry(3, 1000)->get('http://api.currencylayer.com/live', [
                'access_key' => $apiKey,
                'currencies' => $toCurrency,
                'source' => $fromCurrency,
                'format' => 1,
            ]);

            if ($response->successful()) {
                return response()->json($response->json());
            } else {
                return response()->json(['error' => 'Failed to fetch forex data'], $response->status());
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch forex data: ' . $e->getMessage()], 500);
        }
    }
}
