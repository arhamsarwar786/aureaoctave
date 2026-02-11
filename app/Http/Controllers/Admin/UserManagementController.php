<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class UserManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = User::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhereRaw("(SELECT (SUM(CASE WHEN transactions.transaction_type = 'credit' THEN transactions.amount ELSE 0 END) - SUM(CASE WHEN transactions.transaction_type = 'debit' THEN transactions.amount ELSE 0 END)) FROM transactions WHERE transactions.user_id = users.id AND transactions.status = 'approved') = ?", [$search]);
            });
        }

        // Filter non-admin users
        $query->whereDoesntHave('roles', function ($q) {
            $q->where('name', 'admin');
        });

        $users = $query
            ->orderBy($sortField, $sortDirection)
            ->paginate(20)
            ->onEachSide(1);

        return Inertia::render('App/Admin/Users/Index', [
            'users' => UserResource::collection($users),
            'queryParams' => $request->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return Inertia::render('App/Admin/Users/Show', [
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('App/Admin/Users/Edit', [
            'user' => new UserResource($user),
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
        $user->save();
        return Redirect::route('admin.users.index')->with(['type' => 'success', 'message' => "{$user->name} updated successfully."]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    public function updatePassword(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'password' => ['required', 'string', 'min:8', Password::defaults(), 'confirmed'],
        ]);

        $user->password =  Hash::make($validated['password']);
        $user->save();

        return back();
    }
}
