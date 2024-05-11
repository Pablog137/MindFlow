<?php

use App\Models\User;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Auth routes user

Route::post('/register', [ApiAuthController::class, 'register']);
Route::post('/login', [ApiAuthController::class, 'login']);
Route::post('/logout', [ApiAuthController::class, 'logout'])->middleware('auth:sanctum');


Route::get('/getAccessToken', [LoginController::class, 'loginGithub']);


// Users


Route::apiResource('users', UserController::class)->parameters([
    'users' => 'id'
])->only(['index', 'show']);


Route::middleware('auth:sanctum', 'abilities:insertar')->group(function () {
    Route::post('/users', [UserController::class, 'store']);
    Route::put("/users/{id}", [UserController::class, 'update']);
    Route::patch("/users/{id}", [UserController::class, 'update']);
});

Route::middleware('auth:sanctum', 'abilities:borrar')->group(function () {
    Route::delete('users/{id}', [UserController::class, 'destroy']);
});



// Payments


Route::apiResource('payments', PaymentController::class)->parameters([
    'payments' => 'id'
])->only(['index', 'show']);

Route::middleware('auth:sanctum', 'abilities:insertar')->group(function () {
    Route::post('/payments', [PaymentController::class, 'store']);
    Route::put("/payments/{id}", [PaymentController::class, 'update']);
    Route::patch("/payments/{id}", [PaymentController::class, 'update']);
});

Route::middleware('auth:sanctum', 'abilities:borrar')->group(function () {
    Route::delete('payments/{id}', [PaymentController::class, 'destroy']);
});



// TodoLists

Route::apiResource('todo-lists', TodoListController::class)->parameters([
    'todo-lists' => 'id'
])->only(['index', 'show']);

Route::middleware('auth:sanctum', 'abilities:insertar')->group(function () {
    Route::post("/todo-lists", [TodoListController::class, 'store']);
    Route::put("/todo-lists/{id}", [TodoListController::class, 'update']);
    Route::patch("/todo-lists/{id}", [TodoListController::class, 'update']);
});

Route::middleware('auth:sanctum', 'abilities:borrar')->group(function () {
    Route::delete('todo-lists/{id}', [TodoListController::class, 'destroy']);
});



// TodoListTasks

Route::apiResource('todo-list-tasks', TodoListTaskController::class)->parameters([
    'todo-list-tasks' => 'id'
])->only(['index', 'show']);

Route::middleware('auth:sanctum', 'abilities:insertar')->group(function () {
    Route::post("/todo-list-tasks", [TodoListTaskController::class, 'store']);
    Route::put("/todo-list-tasks/{id}", [TodoListTaskController::class, 'update']);
    Route::patch("/todo-list-tasks/{id}", [TodoListTaskController::class, 'update']);
});

Route::middleware('auth:sanctum', 'abilities:borrar')->group(function () {
    Route::delete('todo-list-tasks/{id}', [TodoListTaskController::class, 'destroy']);
});


// Calendar
Route::apiResource("calendar", CalendarController::class)->parameters([
    "calendar" => "id"
])->only(["index", "show"]);

Route::middleware('auth:sanctum', 'abilities:insertar')->group(function () {
    Route::post("/calendar", [CalendarController::class, "store"]);
    Route::put("/calendar/{id}", [CalendarController::class, "update"]);
    Route::patch("/calendar/{id}", [CalendarController::class, "update"]);
});

Route::middleware('auth:sanctum', 'abilities:borrar')->group(function () {
    Route::delete("calendar/{id}", [CalendarController::class, "destroy"]);
});


// Calendar tasks
Route::apiResource("calendar-tasks", CalendarTaskController::class)->parameters([
    "calendar-tasks" => "id"
])->only(["index", "show"]);

Route::middleware('auth:sanctum', 'abilities:insertar')->group(function () {
    Route::post("/calendar-tasks", [CalendarTaskController::class, "store"]);
    Route::put("/calendar-tasks/{id}", [CalendarTaskController::class, "update"]);
    Route::patch("/calendar-tasks/{id}", [CalendarTaskController::class, "update"]);
});

Route::middleware('auth:sanctum', 'abilities:borrar')->group(function () {
    Route::delete("calendar-tasks/{id}", [CalendarTaskController::class, "destroy"]);
});


// Note

Route::apiResource("note", NoteController::class)->parameters([
    "note" => "id"
])->only(["index", "show"]);

Route::middleware('auth:sanctum', 'abilities:insertar')->group(function () {
    Route::post("/note", [NoteController::class, "store"]);
    Route::put("/note/{id}", [NoteController::class, "update"]);
    Route::patch("/note/{id}", [NoteController::class, "update"]);
});

Route::middleware('auth:sanctum', 'abilities:borrar')->group(function () {
    Route::delete("note/{id}", [NoteController::class, "destroy"]);
});
