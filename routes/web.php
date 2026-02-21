<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\TransactionController as AdminTransactionController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepositController;
use App\Http\Controllers\ForexController;
use App\Http\Controllers\InvestmentPackageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SystemSettingController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\WithdrawalController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Home/Index');
})->name('home');
Route::get('/about-us', function () {
    return Inertia::render('About/Index');
})->name('about-us');
Route::get('/why-us', function () {
    return Inertia::render('WhyUs/Index');
})->name('why-us');
Route::get('/contact-us', function () {
    return Inertia::render('Contact/Index');
})->name('contact-us');
Route::get('/become-our-client', function () {
    return Inertia::render('BecomeOurClient/Index');
})->name('become-our-client');

Route::get('/ai', function () {
    return Inertia::render('AI/Index');
})->name('ai');
Route::get('/aurea-ai', function () {
    return Inertia::render('App/aurea-ai/index');
})->name('aurea-ai');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/portfolio', function () {
        return Inertia::render('App/Portfolio');
    })->name('portfolio');

    Route::get('/history', [TransactionController::class, 'index'])->name('history');
    Route::resource('investment-package', InvestmentPackageController::class);
    Route::resource('transactions', TransactionController::class);
    Route::get('/deposit', [DepositController::class, 'index'])->name('deposit');
    Route::post('/deposit/store', [DepositController::class, 'store'])->name('deposit.store');
    Route::get('/withdrawal', [WithdrawalController::class, 'index'])->name('withdrawal');
    Route::post('/withdrawal/store', [WithdrawalController::class, 'store'])->name('withdrawal.store');


    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    Route::prefix('settings')->group(function () {
        Route::get('/account-details', [ProfileController::class, 'edit'])->name('settings.account-details');
        Route::get('/', function () {
            return Inertia::render('App/Settings/Index');
        })->name('settings');

        Route::get('/change-password', function () {
            return Inertia::render('App/Settings/ChangePassword');
        })->name('settings.change-password');

        Route::get('/upload-document', function () {
            return Inertia::render('App/Settings/Documents');
        })->name('settings.upload-document');
    });

    Route::middleware(['role:admin'])->prefix('admin')->group(function () {
        Route::prefix('users')->group(function () {
            Route::get('/', [UserManagementController::class, 'index'])->name('admin.users.index');
            Route::get('/{user}', [UserManagementController::class, 'show'])->name('admin.users.show');
            Route::get('/{user}/edit', [UserManagementController::class, 'edit'])->name('admin.users.edit');
            Route::put('/{user}/update', [UserManagementController::class, 'update'])->name('admin.users.update');
            Route::put('/{user}/update-password', [UserManagementController::class, 'updatePassword'])->name('admin.user.password.update');
        });

        // Admin transactions
        Route::prefix('transactions')->group(function () {
            Route::get('/', [AdminTransactionController::class, 'index'])->name('admin.transactions');
            Route::get('/{transaction}', [AdminTransactionController::class, 'show'])->name('admin.transactions.show');
            Route::put('/{transaction}/update-status', [AdminTransactionController::class, 'updateStatus'])->name('admin.transactions.update-status');
        });

        Route::get('/investment-package', [InvestmentPackageController::class, 'adminIndex'])->name('admin.investment-package');
    });

    Route::resource('system-settings', SystemSettingController::class)->except(['show']);
});



require __DIR__ . '/auth.php';


Route::get('/api/forex', [ForexController::class, 'getForexData']);

Route::get('check-auth', function () {
    return response()->json([
        'user' => auth()->user(),
    ]);
})->middleware('auth:sanctum');
