<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
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
        return [
            "name" => ["required", "string", "max:255"],
            "username" => ["required", "string", "max:50"],
            "email" => ["required", "string", "email", "max:255"],
            "password" => ["required", "string", "min:8"],
            "user_type" => ["required", "string", "in:user,premium,admin"],
            "github_username" => ["string", "max:50", "nullable"],
        ];
    }
}
