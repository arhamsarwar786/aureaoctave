<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $deposits = Transaction::where('transaction_type', 'credit')->paginate(10);
        $withdrawals = Transaction::where('transaction_type', 'debit')->paginate(10);
        return Inertia::render('App/History', [
            'deposits' => TransactionResource::collection($deposits),
            'withdrawals' => TransactionResource::collection($withdrawals),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
                'message' => 'Transaction created successfully.'
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

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransactionRequest $request, Transaction $transaction)
    {
        // Start a database transaction
        DB::beginTransaction();

        try {

            // Validate and retrieve the transaction data from the request
            $transactionData = $request->validated();

            // Update the transaction record
            $transaction->update($transactionData);

            // Commit the transaction
            DB::commit();

            // Return a successful response
            return Redirect::route('history')->with([
                'type' => "success",
                'message' => 'Transaction updated successfully.'
            ]);
        } catch (\Exception $e) {
            // Rollback the transaction if something goes wrong
            DB::rollBack();

            // Log the error for debugging purposes
            Log::error('Error updating transaction: ' . $e->getMessage());

            // Return an error response
            return Redirect::back()->withErrors([
                'type' => "error",
                'message' => 'An error occurred while updating the transaction. Please try again.',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
