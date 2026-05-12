<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class BlogTag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
    ];

    public function posts()
    {
        return $this->belongsToMany(BlogPost::class, 'blog_post_tag');
    }

    protected static function booted(): void
    {
        static::saving(function (BlogTag $tag) {
            if (blank($tag->slug) && filled($tag->name)) {
                $tag->slug = Str::slug($tag->name);
            }
        });
    }
}