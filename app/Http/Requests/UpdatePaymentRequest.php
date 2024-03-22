<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
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
                'payment_date' => 'required|date',
                'expiration_date' => 'required|date',
                'user_id' => 'required|integer|exists:users,id'
            ];
        } else {
            return [
                'payment_date' => 'sometimes|required|date',
                'expiration_date' => 'sometimes|required|date',
                'user_id' => 'sometimes|required|integer|exists:users,id'
            ];
        }
    }
}
