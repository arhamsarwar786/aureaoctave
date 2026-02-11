<?php

namespace Database\Seeders;

use App\Models\Transaction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Number of transactions to create
        $transactionCount = 100;

        // Create transactions
        Transaction::factory()->count($transactionCount)->create();
    }
}