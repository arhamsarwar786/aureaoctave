<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemSetting extends Model
{
    use HasFactory;

    protected $fillable = ['key', 'value'];

    /**
     * Get the value of the given key.
     *
     * @param string $key
     * @return mixed
     */
    public static function getValue($key)
    {
        $setting = self::where('key', $key)->first();

        return $setting ? $setting->value : null;
    }

    /**
     * Set the value of a given key.
     *
     * @param string $key
     * @param mixed $value
     * @return bool
     */
    public static function setValue($key, $value)
    {
        return self::updateOrCreate(['key' => $key], ['value' => $value]);
    }
}
