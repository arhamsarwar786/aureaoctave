<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CommunityQuestion;
use Illuminate\Http\Request;
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
            'is_published' => 'boolean',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $validated['user_id'] = auth()->id();

        CommunityQuestion::create($validated);

        return redirect()->route('admin.community-questions.index')->with('success', 'Question created successfully.');
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
            'is_published' => 'boolean',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $communityQuestion->update($validated);

        return redirect()->route('admin.community-questions.index')->with('success', 'Question updated successfully.');
    }

    public function destroy(CommunityQuestion $communityQuestion)
    {
        $communityQuestion->delete();

        return redirect()->route('admin.community-questions.index')->with('success', 'Question deleted successfully.');
    }
}
