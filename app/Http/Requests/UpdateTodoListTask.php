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
                "list_id" => "required|integer",
                "content" => "required|string",
                "status" => "required|string|in:pending,done,to-do,doing"
            ];
        } else {
            return [
                "list_id" => "sometimes|integer",
                "content" => "sometimes|string",
                "status" => "sometimes|string|in:pending,done,to-do,doing"
            ];
        }
    }
}
