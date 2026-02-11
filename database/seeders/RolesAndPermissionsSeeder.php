<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        Permission::create(['name' => 'manage users']);
        Permission::create(['name' => 'manage investment packages']);
        Permission::create(['name' => 'manage transactions']);
        Permission::create(['name' => 'view transactions']);
        Permission::create(['name' => 'manage system settings']);

        // Create roles and assign permissions
        $role = Role::create(['name' => 'admin']);
        $role->givePermissionTo('manage users');
        $role->givePermissionTo('manage transactions');
        $role->givePermissionTo('manage system settings');
        $role->givePermissionTo('manage investment packages');

        $role = Role::create(['name' => 'user']);
        $role->givePermissionTo('view transactions');

        // Find the user by ID or any other attribute
        $user = User::find(1); // Replace with the actual user ID or other logic
        // Assign the 'admin' role to the user
        $user->assignRole('admin');

        // Fetch all users whose ID is not 1 and assign them the 'user' role
        $users = User::where('id', '!=', 1)->get();

        foreach ($users as $user) {
            $user->assignRole('user');
        }
    }
}
