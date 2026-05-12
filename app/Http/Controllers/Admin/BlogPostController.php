<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\BlogTag;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    public function index(Request $request)
    {
        $query = BlogPost::query()->with(['category', 'tags', 'author']);

        if ($request->filled('search')) {
            $search = $request->string('search')->toString();

            $query->where(function ($builder) use ($search) {
                $builder->where('title', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%")
                    ->orWhereHas('category', function ($categoryQuery) use ($search) {
                        $categoryQuery->where('name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('tags', function ($tagQuery) use ($search) {
                        $tagQuery->where('name', 'like', "%{$search}%");
                    });
            });
        }

        $posts = $query
            ->latest('published_at')
            ->latest('created_at')
            ->paginate(10)
            ->onEachSide(1);

        return Inertia::render('App/Admin/Blog/Index', [
            'posts' => $posts,
            'queryParams' => $request->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function create()
    {
        return Inertia::render('App/Admin/Blog/Create', [
            'categories' => BlogCategory::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:blog_posts,slug'],
            'excerpt' => ['nullable', 'string', 'max:1000'],
            'content' => ['required', 'string'],
            'featured_image' => ['nullable', 'image', 'max:4096'],
            'blog_category_id' => ['nullable', 'exists:blog_categories,id'],
            'category_name' => ['nullable', 'string', 'max:255'],
            'tags' => ['nullable', 'string', 'max:1000'],
            'is_published' => ['nullable', 'boolean'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],
            'schema_markup' => ['nullable', 'string'],
        ]);

        DB::beginTransaction();

        try {
            $post = new BlogPost();
            $post->fill([
                'user_id' => $request->user()->id,
                'blog_category_id' => $validated['blog_category_id'] ?? null,
                'title' => $validated['title'],
                'slug' => $this->makeUniqueSlug($validated['slug'] ?? $validated['title']),
                'excerpt' => $validated['excerpt'] ?? null,
                'content' => $validated['content'],
                'is_published' => (bool) ($validated['is_published'] ?? false),
                'meta_title' => $validated['meta_title'] ?? null,
                'meta_description' => $validated['meta_description'] ?? null,
                'schema_markup' => $validated['schema_markup'] ?? null,
                'published_at' => !empty($validated['is_published']) ? now() : null,
            ]);

            if ($request->filled('category_name') && empty($validated['blog_category_id'])) {
                $category = BlogCategory::firstOrCreate(
                    ['slug' => Str::slug($validated['category_name'])],
                    ['name' => $validated['category_name']]
                );
                $post->blog_category_id = $category->id;
            }

            if ($request->hasFile('featured_image')) {
                $post->featured_image = $request->file('featured_image')->store('blog-posts', 'public');
            }

            $post->save();
            $this->syncTags($post, $validated['tags'] ?? null);

            DB::commit();

            return Redirect::route('blog-posts.index')->with([
                'type' => 'success',
                'message' => 'Blog post created successfully.',
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error creating blog post: ' . $e->getMessage());

            return Redirect::back()->withErrors([
                'type' => 'error',
                'message' => 'An error occurred while creating the blog post.',
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function edit(BlogPost $blogPost)
    {
        $blogPost->load(['category', 'tags']);

        return Inertia::render('App/Admin/Blog/Edit', [
            'post' => $blogPost,
            'categories' => BlogCategory::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, BlogPost $blogPost): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:blog_posts,slug,' . $blogPost->id],
            'excerpt' => ['nullable', 'string', 'max:1000'],
            'content' => ['required', 'string'],
            'featured_image' => ['nullable', 'image', 'max:4096'],
            'blog_category_id' => ['nullable', 'exists:blog_categories,id'],
            'category_name' => ['nullable', 'string', 'max:255'],
            'tags' => ['nullable', 'string', 'max:1000'],
            'is_published' => ['nullable', 'boolean'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],
            'schema_markup' => ['nullable', 'string'],
        ]);

        DB::beginTransaction();

        try {
            if ($request->filled('category_name') && empty($validated['blog_category_id'])) {
                $category = BlogCategory::firstOrCreate(
                    ['slug' => Str::slug($validated['category_name'])],
                    ['name' => $validated['category_name']]
                );
                $validated['blog_category_id'] = $category->id;
            }

            if ($request->hasFile('featured_image')) {
                if ($blogPost->featured_image) {
                    Storage::disk('public')->delete($blogPost->featured_image);
                }

                $validated['featured_image'] = $request->file('featured_image')->store('blog-posts', 'public');
            }

            $published = (bool) ($validated['is_published'] ?? false);
            $validated['is_published'] = $published;
            $validated['published_at'] = $published ? ($blogPost->published_at ?? now()) : null;
            $validated['slug'] = $this->makeUniqueSlug($validated['slug'] ?? $validated['title'], $blogPost->id);

            $blogPost->update([
                'blog_category_id' => $validated['blog_category_id'] ?? null,
                'title' => $validated['title'],
                'slug' => $validated['slug'],
                'excerpt' => $validated['excerpt'] ?? null,
                'content' => $validated['content'],
                'featured_image' => $validated['featured_image'] ?? $blogPost->featured_image,
                'is_published' => $validated['is_published'],
                'published_at' => $validated['published_at'],
                'meta_title' => $validated['meta_title'] ?? null,
                'meta_description' => $validated['meta_description'] ?? null,
                'schema_markup' => $validated['schema_markup'] ?? null,
            ]);

            $this->syncTags($blogPost, $validated['tags'] ?? null);

            DB::commit();

            return Redirect::route('blog-posts.index')->with([
                'type' => 'success',
                'message' => 'Blog post updated successfully.',
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error updating blog post: ' . $e->getMessage());

            return Redirect::back()->withErrors([
                'type' => 'error',
                'message' => 'An error occurred while updating the blog post.',
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function destroy(BlogPost $blogPost): RedirectResponse
    {
        DB::beginTransaction();

        try {
            $blogPost->tags()->detach();

            if ($blogPost->featured_image) {
                Storage::disk('public')->delete($blogPost->featured_image);
            }

            $blogPost->delete();

            DB::commit();

            return Redirect::route('blog-posts.index')->with([
                'type' => 'success',
                'message' => 'Blog post deleted successfully.',
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error deleting blog post: ' . $e->getMessage());

            return Redirect::back()->withErrors([
                'type' => 'error',
                'message' => 'An error occurred while deleting the blog post.',
                'error' => $e->getMessage(),
            ]);
        }
    }

    private function syncTags(BlogPost $post, ?string $tagsInput): void
    {
        $tagNames = collect(explode(',', (string) $tagsInput))
            ->map(fn ($tag) => trim($tag))
            ->filter()
            ->unique();

        $tagIds = $tagNames->map(function (string $tagName) {
            return BlogTag::firstOrCreate(
                ['slug' => Str::slug($tagName)],
                ['name' => $tagName]
            )->id;
        });

        $post->tags()->sync($tagIds->all());
    }

    private function makeUniqueSlug(string $value, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($value);
        $slug = $baseSlug;
        $counter = 1;

        while (
            BlogPost::query()
                ->when($ignoreId, fn ($query) => $query->whereKeyNot($ignoreId))
                ->where('slug', $slug)
                ->exists()
        ) {
            $slug = $baseSlug . '-' . $counter++;
        }

        return $slug;
    }
}