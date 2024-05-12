<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\PaymentController;
use App\Http\Controllers\API\CalendarController;
use App\Http\Controllers\API\TodoListController;
use App\Http\Controllers\API\CalendarTaskController;
use App\Http\Controllers\API\NoteController;
use App\Http\Controllers\API\TodoListTaskController;
use App\Http\Controllers\Auth\ApiAuthController;
use App\Http\Controllers\Auth\LoginController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/




Route::post('/register', [ApiAuthController::class, 'register']);
Route::post('/login', [ApiAuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Auth routes user
    Route::post('/logout', [ApiAuthController::class, 'logout']);

    Route::get('/getAccessToken', [LoginController::class, 'loginGithub']);

    // Users
    Route::apiResource('users', UserController::class)->parameters([
        'users' => 'id'
    ])->only(['index', 'show', 'store', 'update', 'destroy']);

    // Payments
    Route::apiResource('payments', PaymentController::class)->parameters([
        'payments' => 'id'
    ])->only(['index', 'show', 'store', 'update', 'destroy']);

    // TodoLists
    Route::apiResource('todo-lists', TodoListController::class)->parameters([
        'todo-lists' => 'id'
    ])->only(['index', 'show', 'store', 'update', 'destroy']);

    // TodoListTasks
    Route::apiResource('todo-list-tasks', TodoListTaskController::class)->parameters([
        'todo-list-tasks' => 'id'
    ])->only(['index', 'show', 'store', 'update', 'destroy']);
    // Route::get('/todo-list-tasks', [TodoListTaskController::class, 'index']);
    // Route::post('/todo-list-tasks', [TodoListTaskController::class, 'store']);


    // Calendar
    Route::apiResource('calendar', CalendarController::class)->parameters([
        'calendar' => 'id'
    ])->only(['index', 'show', 'store', 'update', 'destroy']);

    // Calendar Tasks
    Route::apiResource('calendar-tasks', CalendarTaskController::class)->parameters([
        'calendar-tasks' => 'id'
    ])->only(['index', 'show', 'store', 'update', 'destroy']);

    // Note
    Route::apiResource('note', NoteController::class)->parameters([
        'note' => 'id'
    ])->only(['index', 'show', 'store', 'update', 'destroy']);
});
