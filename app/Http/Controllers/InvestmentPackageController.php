<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvestmentPackageRequest;
use App\Http\Requests\UpdateInvestmentPackageRequest;
use App\Http\Resources\InvestmentPackageResource;
use App\Models\InvestmentPackage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class InvestmentPackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $investmentPackages = InvestmentPackage::all();
        return Inertia::render('App/InvestmentPackage', [
            'investmentPackages' =>  InvestmentPackageResource::collection($investmentPackages),
        ]);
    }

    public function adminIndex(Request $request)
    {
        $query = InvestmentPackage::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('code', 'like', "%{$search}%")
                    ->orWhere('expense_ratio', 'like', "%{$search}%")
                    ->orWhere('sec_yield', 'like', "%{$search}%")
                    ->orWhere('ytd', 'like', "%{$search}%")
                    ->orWhere('one_year', 'like', "%{$search}%")
                    ->orWhere('fund_price', 'like', "%{$search}%")
                    ->orWhere('fund_price', 'like', "%{$search}%");
            });
        }

        $investmentPackages = $query
            ->orderBy($sortField, $sortDirection)
            ->paginate(20)
            ->onEachSide(1);

        return Inertia::render('App/Admin/InvestmentPackage/Index', [
            'investmentPackages' =>  InvestmentPackageResource::collection($investmentPackages),
            'queryParams' => $request->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('App/Admin/InvestmentPackage/Create', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInvestmentPackageRequest $request)
    {
        // Start a database transaction
        DB::beginTransaction();
        try {
            // Validate and retrieve the transaction data from the request
            $validatedData = $request->validated();

            // Create a new Transaction record
            InvestmentPackage::create($validatedData);

            // Commit the transaction
            DB::commit();

            // Return a successful response
            return Redirect::route('admin.investment-package')->with([
                'type' => "success",
                'message' => 'Investment package created successfully.'
            ]);
        } catch (Exception $e) {
            // Rollback the transaction if something goes wrong
            DB::rollBack();

            // Log the error for debugging purposes
            Log::error('Error creating transaction: ' . $e->getMessage());

            // Return an error response
            return Redirect::back()->withErrors([
                'type' => "error",
                'message' => 'An error occurred while creating the transaction. Please try again.',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(InvestmentPackage $investmentPackage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InvestmentPackage $investmentPackage)
    {
        return Inertia::render('App/Admin/InvestmentPackage/Edit', [
            'investmentPackage' =>  $investmentPackage,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInvestmentPackageRequest $request, InvestmentPackage $investmentPackage)
    {
        // Start a database transaction
        DB::beginTransaction();
        try {
            // Validate and retrieve the transaction data from the request
            $validatedData = $request->validated();

            // update a  Transaction record
            $investmentPackage->update($validatedData);

            // Commit the transaction
            DB::commit();

            // Return a successful response
            return Redirect::route('admin.investment-package')->with([
                'type' => "success",
                'message' => 'Investment package created successfully.'
            ]);
        } catch (Exception $e) {
            // Rollback the transaction if something goes wrong
            DB::rollBack();

            // Log the error for debugging purposes
            Log::error('Error updating transaction: ' . $e->getMessage());

            // Return an error response
            return Redirect::back()->withErrors([
                'type' => "error",
                'message' => 'An error occurred while creating the transaction. Please try again.',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InvestmentPackage $investmentPackage)
    {

        // // Check for related models (example relationships: investments, users)
        // if ($investmentPackage->investments()->exists() || $investmentPackage->users()->exists()) {
        //     // Return an error response if there are related models
        //     return Redirect::back()->with([
        //         'type' => "error",
        //         'message' => 'Cannot delete this investment package because it is associated with other records.',
        //     ]);
        // }

        $investmentPackage->delete();

        // Return an error response
        return Redirect::back()->with([
            'type' => "success",
            'message' => 'Investment package deleted successfully.',
        ]);
    }
}
