<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MarketDataController extends Controller
{
    public function trending(Request $request)
    {
        return response()->json([
            'data' => [],
            'message' => 'Market data endpoint',
        ]);
    }
}
