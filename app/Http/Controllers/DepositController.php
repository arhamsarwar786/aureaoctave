<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionRequest;
use App\Models\SystemSetting;
use App\Models\Transaction;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DepositController extends Controller
{
    public function index()
    {
        $btcAddress = SystemSetting::getValue('btc_address');
        return Inertia::render('App/Deposit', [
            'btcAddress' => $btcAddress
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request)
    {
        // Start a database transaction
        DB::beginTransaction();
        try {
            $user = auth()->user();
            // Validate and retrieve the transaction data from the request
            $transactionData = $request->validated();
            $transactionData['user_id'] = $user->id;

            // Create a new Transaction record
            Transaction::create($transactionData);

            // Commit the transaction
            DB::commit();

            // Return a successful response
            return Redirect::route('history')->with([
                'type' => "success",
                'message' => 'Deposit was successfully, awaiting confirmation.'
            ]);
        } catch (Exception $e) {
            // Rollback the transaction if something goes wrong
            DB::rollBack();

            // Log the error for debugging purposes
            Log::error('Error creating transaction: ' . $e->getMessage());

            // Return an error response
            return Redirect::back()->withErrors([
                'type' => "error",
                'message' => 'An error occurred while creating the transaction. Please try again.',
                'error' => $e->getMessage()
            ]);
        }
    }
}
