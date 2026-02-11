<?php

namespace App\Models;

use App\Traits\GeneratesIds;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory, GeneratesIds;
    protected $fillable = [
        'user_id',
        'transaction_type',
        'amount',
        'balance_before',
        'balance_after',
        'transaction_date',
        'pasted_transaction_id',
        'status',
    ];
    // Update Account balance on everytime a transaction happens
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($transaction) {
            // Generate a unique transaction ID
            $transaction->transaction_id = self::generateTransactionID();

            // Fetch the previous approved transaction of the user
            $previousTransaction = Transaction::where('user_id', $transaction->user_id)
                ->where('status', 'approved')
                ->latest()
                ->first();

            // Set balance_before to the previous transaction's balance_after or default to 0 if no previous transaction exists
            $transaction->balance_before = $previousTransaction ? $previousTransaction->balance_after : 0;

            // Calculate the new balance_after based on the transaction type
            if ($transaction->transaction_type === 'credit') {
                $transaction->balance_after = $transaction->balance_before + $transaction->amount;
            } else {
                $transaction->balance_after = $transaction->balance_before - $transaction->amount;
            }

            // Set the transaction_date to the current date and time if not already set
            if (is_null($transaction->transaction_date)) {
                $transaction->transaction_date = Carbon::now();
            }
        });
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}