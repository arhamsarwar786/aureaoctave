<?php

namespace Database\Seeders;

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
        Permission::firstOrCreate(['name' => 'manage users', 'guard_name' => 'web']);
        Permission::firstOrCreate(['name' => 'manage investment packages', 'guard_name' => 'web']);
        Permission::firstOrCreate(['name' => 'manage transactions', 'guard_name' => 'web']);
        Permission::firstOrCreate(['name' => 'view transactions', 'guard_name' => 'web']);
        Permission::firstOrCreate(['name' => 'manage system settings', 'guard_name' => 'web']);

        // Create roles and assign permissions
        $role = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $role->givePermissionTo('manage users');
        $role->givePermissionTo('manage transactions');
        $role->givePermissionTo('manage system settings');
        $role->givePermissionTo('manage investment packages');

        $role = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'web']);
        $role->givePermissionTo('view transactions');

        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
    }
}
