<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Exception;
use Illuminate\Http\Request;
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
        $transactions = Transaction::with('user')->paginate(20);
        return Inertia::render('App/Admin/Transaction/Index', [
            'transactions' => TransactionResource::collection($transactions),
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        $transaction->load('user');
        return Inertia::render('App/Admin/Transaction/Show', [
            'transaction' => new TransactionResource($transaction),
        ]);
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
    public function update(Request $request, Transaction $transaction)
    {
        //
    }
    public function updateStatus(Request $request, Transaction $transaction)
    {
        // Start a database transaction
        DB::beginTransaction();
        try {
            $request->validate([
                'status' => 'required|in:approved,processing,declined',
            ]);

            $transaction->update(["status" => $request->status]);

            // Commit the transaction
            DB::commit();

            // Return a successful response
            return Redirect::back()->with([
                'type' => "success",
                'message' => 'Transaction\'s status updated successfully.'
            ]);
        } catch (Exception $e) {
            // Rollback the transaction if something goes wrong
            DB::rollBack();

            // Log the error for debugging purposes
            Log::error('Error updating transaction\'s status: ' . $e->getMessage());

            // Return an error response
            return Redirect::back()->withErrors([
                'type' => "error",
                'message' => 'An error occurred while updating the transaction\'s status. Please try again.',
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
