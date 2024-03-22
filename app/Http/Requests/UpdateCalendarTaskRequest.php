<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCalendarTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $method = $this->method();
        if ($method === "PUT") {
            return [
                "calendar_id" => "required|integer",
                "content" => "required|string",
                "tag" => "required|string"
            ];
        } else {
            return [
                "calendar_id" => "sometimes|integer",
                "content" => "sometimes|string",
                "tag" => "sometimes|string"
            ];
        }
    }
}
