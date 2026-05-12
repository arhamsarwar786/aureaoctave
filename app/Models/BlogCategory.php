<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class BlogCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
    ];

    public function posts()
    {
        return $this->hasMany(BlogPost::class);
    }

    protected static function booted(): void
    {
        static::saving(function (BlogCategory $category) {
            if (blank($category->slug) && filled($category->name)) {
                $category->slug = Str::slug($category->name);
            }
        });
    }
}