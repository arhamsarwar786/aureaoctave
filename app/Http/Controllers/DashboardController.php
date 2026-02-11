<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $lastTransaction = Transaction::where("user_id", $user->id)->where("status", "approved")->latest()->first();
        $balance = $lastTransaction ? $lastTransaction->balance_after : 0.00;
        return Inertia::render('App/Dashboard', [
            'balance' => $balance,
        ]);
    }
}
