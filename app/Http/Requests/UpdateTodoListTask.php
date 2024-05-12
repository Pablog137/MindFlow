<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTodoListTask extends FormRequest
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
                "content" => "required|string",
                "status" => "required|string|in:done,todo,doing",
                "difficulty" => "required|integer|in:1,2,3",
                "due_date" => "nullable|string",
                "closed_at" => "nullable|string"
            ];
        } else {
            return [
                "content" => "sometimes|string",
                "status" => "sometimes|string|in:done,todo,doing",
                "difficulty" => "sometimes|integer|in:1,2,3",
                "due_date" => "sometimes|nullable|string",
                "closed_at" => "sometimes|nullable|string"
            ];
        }
    }
}
