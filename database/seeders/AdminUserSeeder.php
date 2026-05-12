<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminName = env('ADMIN_NAME', 'Admin User');
        $adminEmail = env('ADMIN_EMAIL', 'arhamsarwar786@gmail.com');
        $adminPassword = env('ADMIN_PASSWORD', 'password');

        $user = User::updateOrCreate(
            ['email' => $adminEmail],
            [
                'name' => $adminName,
                'password' => Hash::make($adminPassword),
                'email_verified_at' => now(),
            ]
        );

        $user->assignRole('admin');
    }
}
