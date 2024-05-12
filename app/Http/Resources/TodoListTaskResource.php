<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TodoListTaskResource extends JsonResource
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
            "content" => $this->content,
            "status" => $this->status,
            "difficulty" => $this->difficulty,
            "due_date" => $this->due_date,
            "closed_at" => $this->closed_at,
            "created_at" => $this->created_at
        ];
    }
}
