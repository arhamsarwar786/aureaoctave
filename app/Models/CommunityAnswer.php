<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommunityAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'community_question_id',
        'user_id',
        'body',
        'is_approved'
    ];

    protected $casts = [
        'is_approved' => 'boolean',
    ];
    
    protected $appends = ['upvotes_count', 'downvotes_count', 'user_vote'];

    public function question()
    {
        return $this->belongsTo(CommunityQuestion::class, 'community_question_id');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function votes()
    {
        return $this->morphMany(CommunityVote::class, 'votable');
    }
    
    public function getUpvotesCountAttribute()
    {
        return $this->votes()->where('type', 1)->count();
    }
    
    public function getDownvotesCountAttribute()
    {
        return $this->votes()->where('type', -1)->count();
    }
    
    public function getUserVoteAttribute()
    {
        if (auth()->check()) {
            $vote = $this->votes()->where('user_id', auth()->id())->first();
            return $vote ? $vote->type : 0;
        }
        return 0;
    }
}
