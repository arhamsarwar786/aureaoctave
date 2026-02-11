<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InvestmentPackage>
 */
class InvestmentPackageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'code' => strtoupper($this->faker->lexify('???')),
            'expense_ratio' => $this->faker->randomFloat(2, -0.1, 0.1),
            'sec_yield' => $this->faker->randomFloat(2, -5, 5),
            'ytd' => $this->faker->randomFloat(2, -50, 50),
            'one_year' => $this->faker->randomFloat(2, -50, 50),
            'fund_price' => '$' . $this->faker->numberBetween(1000, 10000),
        ];
    }
}