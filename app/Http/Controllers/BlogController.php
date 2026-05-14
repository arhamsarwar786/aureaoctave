<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = BlogPost::query()
            ->with(['category', 'tags'])
            ->where('is_published', true);

        if ($request->filled('search')) {
            $search = $request->string('search')->toString();

            $query->where(function ($builder) use ($search) {
                $builder->where('title', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%");
            });
        }

        $posts = $query
            ->latest('published_at')
            ->latest('created_at')
            ->paginate(9)
            ->onEachSide(1);

        return Inertia::render('Resources/Blog/Index', [
            'posts' => $posts,
            'queryParams' => $request->query() ?: null,
        ]);
    }

    public function show(BlogPost $blogPost)
    {
        abort_unless($blogPost->is_published, 404);

        $blogPost->load(['category', 'tags', 'author']);

        $relatedPosts = BlogPost::query()
            ->with(['category'])
            ->where('is_published', true)
            ->whereKeyNot($blogPost->id)
            ->when($blogPost->blog_category_id, function ($query) use ($blogPost) {
                $query->where('blog_category_id', $blogPost->blog_category_id);
            })
            ->latest('published_at')
            ->limit(3)
            ->get();

        return Inertia::render('Resources/Blog/Show', [
            'post' => $blogPost,
            'relatedPosts' => $relatedPosts,
        ]);
    }

    public function image(string $path)
    {
        abort_if(str_contains($path, '..'), 404);

        abort_unless(Storage::disk('public')->exists($path), 404);

        $filePath = Storage::disk('public')->path($path);
        $mimeType = Storage::disk('public')->mimeType($path) ?: 'application/octet-stream';

        return response()->file($filePath, [
            'Content-Type' => $mimeType,
            'Cache-Control' => 'public, max-age=31536000',
        ]);
    }
}
