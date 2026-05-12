<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 10 users
        $users = User::factory()->count(10)->create();

        Role::firstOrCreate([
            'name' => 'user',
            'guard_name' => 'web',
        ]);

        $users->each->assignRole('user');
    }
}