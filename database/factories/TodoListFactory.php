<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TodoList>
 */
class TodoListFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userId = User::inRandomOrder()->first()->id;  // Permite asociar una lista a un usuario aleatorio
        return [
            "title" => $this->faker->randomElement([
                "Tareas pendientes",
                "Tareas mes",
                "Tareas semana",
                "Objetivos semanales",
                "Tareas pendientes"
            ]),
            "user_id" => $userId,
        ];
    }
}
