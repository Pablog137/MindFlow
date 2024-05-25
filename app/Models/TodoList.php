<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TodoList extends Model
{
    use HasFactory;
    protected $table = 'todo_lists';
    protected $fillable = [ 'user_id'];

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function todoListTasks(){
        return $this->hasMany(TodoListTask::class);
    }
}
