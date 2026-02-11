<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Get a random user ID
        $userId = User::inRandomOrder()->first()->id;

        // Generate transaction data
        $amount = $this->faker->randomFloat(2, 1, 10000);
        $balanceBefore = $this->faker->optional()->randomFloat(2, 0, 20000);
        $transactionType = $this->faker->randomElement(['credit', 'debit']);
        $balanceAfter = ($transactionType === 'credit')
            ? $balanceBefore + $amount
            : $balanceBefore - $amount;

        return [
            'user_id' => $userId,
            'transaction_type' => $transactionType,
            'amount' => $amount,
            'balance_before' => $balanceBefore,
            'balance_after' => $balanceAfter,
            'transaction_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'status' => $this->faker->boolean,
        ];
    }
}