<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class BlogPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'blog_category_id',
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'is_published',
        'published_at',
        'meta_title',
        'meta_description',
        'schema_markup',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    protected $appends = [
        'featured_image_url',
        'excerpt_preview',
    ];

    public function category()
    {
        return $this->belongsTo(BlogCategory::class, 'blog_category_id');
    }

    public function tags()
    {
        return $this->belongsToMany(BlogTag::class, 'blog_post_tag');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getFeaturedImageUrlAttribute(): ?string
    {
        if (blank($this->featured_image)) {
            return null;
        }

        if (Str::startsWith($this->featured_image, ['http://', 'https://'])) {
            $path = parse_url($this->featured_image, PHP_URL_PATH);

            if (is_string($path) && Str::startsWith($path, '/storage/')) {
                return route('blog.images.show', ['path' => Str::after($path, '/storage/')], false);
            }

            return $this->featured_image;
        }

        if (Str::startsWith($this->featured_image, ['/storage/', 'storage/'])) {
            return route('blog.images.show', [
                'path' => Str::after(ltrim($this->featured_image, '/'), 'storage/'),
            ], false);
        }

        return route('blog.images.show', ['path' => ltrim($this->featured_image, '/')], false);
    }

    public function getExcerptPreviewAttribute(): string
    {
        if (filled($this->excerpt)) {
            return $this->excerpt;
        }

        return Str::limit(strip_tags((string) $this->content), 180);
    }
}
