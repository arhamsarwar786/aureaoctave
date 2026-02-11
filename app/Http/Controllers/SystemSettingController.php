<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSystemSettingRequest;
use App\Http\Requests\UpdateSystemSettingRequest;
use App\Models\SystemSetting;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SystemSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $settings = SystemSetting::all();
        return Inertia::render('App/Admin/SystemSettings/Index', ['settings' => $settings]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('App/Admin/SystemSettings/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSystemSettingRequest $request)
    {
        // Start a database transaction
        DB::beginTransaction();
        try {
            // Validate and retrieve the transaction data from the request
            $validatedData = $request->validated();

            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('system_settings_images', 'public');
                $data['value'] = $imagePath;
            }

            // Create a new Transaction record
            SystemSetting::create($validatedData);

            // Commit the transaction
            DB::commit();

            // Return a successful response
            return Redirect::route('system-settings.index')->with([
                'type' => "success",
                'message' => 'System setting was added.'
            ]);
        } catch (Exception $e) {
            // Rollback the transaction if something goes wrong
            DB::rollBack();

            // Log the error for debugging purposes
            Log::error('Error adding system settings: ' . $e->getMessage());

            // Return an error response
            return Redirect::back()->withErrors([
                'type' => "error",
                'message' => 'An error occurred while adding the system setting. Please try again.',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(SystemSetting $systemSetting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SystemSetting $systemSetting)
    {
        return Inertia::render('App/Admin/SystemSettings/Edit', ['systemSetting' => $systemSetting]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSystemSettingRequest $request, SystemSetting $systemSetting)
    {

        // Start a database transaction
        DB::beginTransaction();
        try {
            // Validate and retrieve the transaction data from the request
            $validatedData = $request->validated();

            if ($request->hasFile('image')) {
                // Delete the old image if it exists
                if ($systemSetting->image_path) {
                    Storage::disk('public')->delete($systemSetting->image_path);
                }
                $imagePath = $request->file('image')->store('system_settings_images', 'public');
                $validatedData['value'] = $imagePath;
            }

            $systemSetting->update($validatedData);

            // Commit the transaction
            DB::commit();

            // Return a successful response
            return Redirect::route('system-settings.index')->with([
                'type' => "success",
                'message' => 'System setting updated successfully.'
            ]);
        } catch (Exception $e) {
            // Rollback the transaction if something goes wrong
            DB::rollBack();

            // Log the error for debugging purposes
            Log::error('Error adding system settings: ' . $e->getMessage());

            // Return an error response
            return Redirect::back()->withErrors([
                'type' => "error",
                'message' => 'An error occurred while adding the system setting. Please try again.',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SystemSetting $systemSetting)
    {
        //
    }
}
