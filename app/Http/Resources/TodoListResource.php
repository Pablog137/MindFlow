<?php

namespace App\Http\Resources;

use App\Models\TodoListTask;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TodoListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "title" => $this->title,
            "user_id" => $this->user_id,
            "todo_list_tasks" => TodoListTaskResource::collection($this->whenLoaded("todoListTasks"))
        ];
    }
}
