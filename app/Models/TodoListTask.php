<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TodoListTask extends Model
{
    use HasFactory;
    protected $table = 'todo_list_tasks';
    protected $fillable = ['todo_list_id', 'content', 'status', "due_date", "closed_at", "difficulty"];


    public function todoList()
    {
        return $this->belongsTo(TodoList::class);
    }
}
