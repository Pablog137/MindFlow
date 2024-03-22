<?php

namespace App\Http\Controllers\API;

use App\Models\TodoList;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateTodoListRequest;
use App\Http\Resources\TodoListCollection;
use App\Http\Resources\TodoListResource;

class TodoListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return new TodoListCollection(TodoList::paginate(5));
        $tasks = TodoList::with("todoListTasks")->paginate(5);
        return new TodoListCollection($tasks);
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
    public function store(Request $request)
    {
        $datos = $request->all();
        return new TodoListResource(TodoList::create($datos));
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $todoList = TodoList::find($id);
        $todoList->load('todoListTasks');
        return new TodoListResource($todoList);
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
    public function update(UpdateTodoListRequest $request, string $id)
    {
        $todoList = TodoList::find($id);
        $todoList->update($request->all());
        return new TodoListResource($todoList);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $todoList = TodoList::find($id);
        $todoList->delete();
        return response()->json([
            'message' => 'TodoList deleted successfully'
        ]);
    }
}
