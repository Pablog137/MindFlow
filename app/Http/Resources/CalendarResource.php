<?php

namespace App\Http\Resources;

use App\Models\CalendarTask;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CalendarResource extends JsonResource
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
            "user_id" => $this->user_id,
            "calendar_tasks" => CalendarTaskResource::collection($this->whenLoaded("calendarTasks"))
        ];
    }
}
