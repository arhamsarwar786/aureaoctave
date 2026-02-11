<?php

namespace Database\Seeders;

use App\Models\SystemSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SystemSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // ['key' => 'site_name', 'value' => 'Aurea Octave'],
            // ['key' => 'site_url', 'value' => 'https://www.myawesomewebsite.com'],
            // ['key' => 'admin_email', 'value' => 'admin@myawesomewebsite.com'],
            ['key' => 'timezone', 'value' => 'UTC'],
            ['key' => 'btc_address', 'value' => 'xbc1qm80sg5m59ukmxlka8c5utqk93nvjk9xp9qp0am'],
        ];

        foreach ($settings as $setting) {
            SystemSetting::create($setting);
        }
    }
}
