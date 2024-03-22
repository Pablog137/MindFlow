<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $premiumUserIds = User::where('user_type', 'premium')->pluck('id')->shuffle()->toArray();  // Suffle mezcla los ids

        foreach ($premiumUserIds as $userId) {
            $date = $this->faker->dateTimeThisYear($max = 'now', $timezone = null);
            $expirationDate = strtotime('+ 1 month', strtotime($date->format('Y-m-d')));
            return [
                'payment_date' => $date->format('Y-m-d'),
                'expiration_date' => date('Y-m-d', $expirationDate),
                'user_id' => $userId,
            ];
        }


    }
}
