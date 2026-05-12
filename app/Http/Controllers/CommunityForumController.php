<?php

namespace App\Http\Controllers;

use App\Models\CommunityAnswer;
use App\Models\CommunityQuestion;
use App\Models\CommunityVote;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommunityForumController extends Controller
{
    public function index(Request $request)
    {
        $query = CommunityQuestion::where('is_published', true)
            ->withCount('answers')
            ->with('author:id,name,email');

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('body', 'like', '%' . $request->search . '%');
        }
        
        if ($request->filled('filter')) {
            if ($request->filter === 'popular') {
                $query->orderByDesc('views_count');
            } elseif ($request->filter === 'unanswered') {
                $query->having('answers_count', 0);
            }
        }

        $questions = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('Community/Index', [
            'questions' => $questions,
            'queryParams' => $request->query() ?: null,
        ]);
    }

    public function show(CommunityQuestion $question)
    {
        abort_unless($question->is_published, 404);

        $question->increment('views_count');

        $question->load('author:id,name');

        $answers = $question->answers()
            ->where('is_approved', true)
            ->with('author:id,name')
            ->get();

        return Inertia::render('Community/Show', [
            'question' => $question,
            'answers' => $answers,
        ]);
    }

    public function storeAnswer(Request $request, CommunityQuestion $question)
    {
        $validated = $request->validate([
            'body' => 'required|string|min:3',
        ]);

        $question->answers()->create([
            'user_id' => auth()->id(),
            'body' => $validated['body'],
            'is_approved' => true,
        ]);

        return back()->with('success', 'Answer posted successfully.');
    }

    public function vote(Request $request)
    {
        $validated = $request->validate([
            'answer_id' => 'required|exists:community_answers,id',
            'type' => 'required|in:1,-1', 
        ]);

        $vote = CommunityVote::where('user_id', auth()->id())
            ->where('votable_id', $validated['answer_id'])
            ->where('votable_type', CommunityAnswer::class)
            ->first();
            
        if ($vote && $vote->type == $validated['type']) {
            // Remove vote if clicking the same button
            $vote->delete();
        } else {
            CommunityVote::updateOrCreate(
                [
                    'user_id' => auth()->id(),
                    'votable_id' => $validated['answer_id'],
                    'votable_type' => CommunityAnswer::class,
                ],
                [
                    'type' => $validated['type']
                ]
            );
        }

        return back();
    }
}
