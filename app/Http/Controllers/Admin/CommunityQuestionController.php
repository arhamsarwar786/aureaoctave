<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CommunityQuestion;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CommunityQuestionController extends Controller
{
    public function index(Request $request)
    {
        $query = CommunityQuestion::query()
            ->withCount('answers')
            ->with('author:id,name');

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $questions = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('App/Admin/Community/Index', [
            'questions' => $questions,
            'queryParams' => $request->query() ?: null,
        ]);
    }

    public function create()
    {
        return Inertia::render('App/Admin/Community/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:community_questions,slug',
            'body' => 'required|string',
            'is_published' => 'nullable|boolean',
        ]);

        try {
            DB::beginTransaction();

            $validated['slug'] = $this->makeUniqueSlug($validated['slug'] ?? $validated['title']);
            $validated['is_published'] = (bool) ($validated['is_published'] ?? false);
            $validated['user_id'] = auth()->id();

            CommunityQuestion::create($validated);

            DB::commit();

            return redirect()->route('admin.community-questions.index')->with('success', 'Question created successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error creating community question: ' . $e->getMessage());

            return back()->withErrors([
                'form' => 'An error occurred while creating the question.',
            ])->withInput();
        }
    }

    public function edit(CommunityQuestion $communityQuestion)
    {
        return Inertia::render('App/Admin/Community/Edit', [
            'question' => $communityQuestion
        ]);
    }

    public function update(Request $request, CommunityQuestion $communityQuestion)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:community_questions,slug,' . $communityQuestion->id,
            'body' => 'required|string',
            'is_published' => 'nullable|boolean',
        ]);

        try {
            DB::beginTransaction();

            $validated['slug'] = $this->makeUniqueSlug($validated['slug'] ?? $validated['title'], $communityQuestion->id);
            $validated['is_published'] = (bool) ($validated['is_published'] ?? false);

            $communityQuestion->update($validated);

            DB::commit();

            return redirect()->route('admin.community-questions.index')->with('success', 'Question updated successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error updating community question: ' . $e->getMessage());

            return back()->withErrors([
                'form' => 'An error occurred while updating the question.',
            ])->withInput();
        }
    }

    public function destroy(CommunityQuestion $communityQuestion)
    {
        $communityQuestion->delete();

        return redirect()->route('admin.community-questions.index')->with('success', 'Question deleted successfully.');
    }

    private function makeUniqueSlug(string $value, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($value) ?: Str::random(8);
        $slug = $baseSlug;
        $counter = 1;

        while (
            CommunityQuestion::query()
                ->when($ignoreId, fn ($query) => $query->whereKeyNot($ignoreId))
                ->where('slug', $slug)
                ->exists()
        ) {
            $slug = $baseSlug . '-' . $counter++;
        }

        return $slug;
    }
}
