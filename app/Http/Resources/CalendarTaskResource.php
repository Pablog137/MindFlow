<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CalendarTaskResource extends JsonResource
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
            "calendar_id" => $this->calendar_id,
            "content" => $this->content,
            "tag" => $this->tag,
            "closed_at" => $this->closed_at,
            "created_at" => $this->created_at,
        ];
    }
}
