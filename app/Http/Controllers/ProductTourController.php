<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductTourController extends Controller
{
    /**
     * Mark the product tour as shown for the authenticated user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function markTourAsShown(Request $request): JsonResponse
    {
        try {
            $request->user()->update([
                'product_tour_shown' => true,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Product tour marked as shown',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update tour status',
            ], 500);
        }
    }
}
