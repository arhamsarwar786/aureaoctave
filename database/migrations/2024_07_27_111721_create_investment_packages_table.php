<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('investment_packages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code');
            $table->decimal('expense_ratio', 5, 2);
            $table->decimal('sec_yield', 5, 2);
            $table->decimal('ytd', 5, 2);
            $table->decimal('one_year', 5, 2);
            $table->string('fund_price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('investment_packages');
    }
};