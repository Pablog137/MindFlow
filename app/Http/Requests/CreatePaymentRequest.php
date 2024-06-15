<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePaymentRequest extends FormRequest
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
            'expiry_date' => ['required', 'regex:/^(0[1-9]|1[0-2])\/\d{2}$/', function ($attribute, $value, $fail) {
                if (!$this->isExpiryDateValid($value)) {
                    $fail('The ' . $attribute . ' must be a future date.');
                }
            }],
            "cvv" => "required|digits:3",
            'cardNumber' => 'required|digits:16|regex:/^[0-9]{16}$/',
        ];
    }

    private function isExpiryDateValid($date)
    {
        // Extract month and year
        [$month, $year] = explode('/', $date);
        // Add 2000 to the year to get the correct century
        $year = '20' . $year;

        $expiryDate = \Carbon\Carbon::createFromDate($year, $month, 1)->endOfMonth();
        return $expiryDate->isFuture();
    }
}
