<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
        $metodo = $this->getMethod();
        if ($metodo == "PUT") {
            return [
                'username' => 'required|string|max:50',
                'email' => 'required|string|email|max:255',
                'password' => 'required|string|min:8',
                'user_type' => 'required|string|in:user,premium,admin',
                'github_username' => 'string|max:50|nullable',
            ];
        } else {
            return [
                'username' => 'sometimes|required|string|max:50',
                'email' => 'sometimes|required|string|email|max:255',
                'password' => 'sometimes|required|string|min:8',
                'user_type' => 'sometimes|required|string|in:user,premium,admin',
                'github_username' => 'sometimes|string|max:50|nullable',
            ];
        }
    }
}
