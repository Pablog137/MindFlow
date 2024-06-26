<?php

namespace App\Http\Controllers\API;

use App\Models\TodoListTask;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateTodoListTaskRequest;
use App\Http\Requests\UpdateTodoListTask;
use App\Http\Resources\TodoListTaskResource;
use App\Http\Resources\TodoListTaskCollection;

class TodoListTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $tasks = TodoListTask::whereHas('todoList', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->get();

        return new TodoListTaskCollection($tasks);
    }

    public function indexWithoutClosed(Request $request)
    {
        $userId = $request->user()->id;

        $tasks = TodoListTask::whereHas('todoList', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->whereNull('closed_at')->get();

        return new TodoListTaskCollection($tasks);
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
    public function store(CreateTodoListTaskRequest $request)
    {
        $todoListId = $request->user()->id;
        $task = new TodoListTask($request->all());
        $task->todo_list_id = $todoListId;
        $task->save();
        return new TodoListTaskResource($task);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $todoListTask = TodoListTask::find($id);
        return new TodoListTaskResource($todoListTask);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodoListTask $request, string $id)
    {
        $todoListTask = TodoListTask::find($id);
        $todoListTask->update($request->all());
        return new TodoListTaskResource($todoListTask);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $todoListTask = TodoListTask::find($id);
        $todoListTask->delete();
        return response()->json([
            "message" => "TodoListTask deleted successfully."
        ]);
    }
}
