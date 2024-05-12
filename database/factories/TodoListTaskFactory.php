<?php

namespace Database\Factories;

use App\Models\TodoList;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TodoListTask>
 */
class TodoListTaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    private $tasks = [
        'Comprar leche',
        'Llamar al médico',
        'Enviar correo electrónico de trabajo',
        'Hacer ejercicio',
        'Estudiar para el examen',
        'Organizar el armario',
        'Preparar la cena',
        'Pasear al perro',
        'Hacer la compra semanal',
        'Limpiar la casa',
        'Sacar la basura',
        'Lavar el coche',
        'Regar las plantas',
        'Planificar las vacaciones',
        'Hacer una lista de compras',
        'Ir al banco',
        'Revisar el correo electrónico',
        'Ordenar la habitación',
        'Hacer una llamada importante',
        'Leer un libro'
    ];


    public function definition(): array
    {
        return [
            "todo_list_id" => TodoList::all()->random()->id,
            "content" => $this->tasks[array_rand($this->tasks, 1)],
            "status" => $this->faker->randomElement(['todo', 'doing', 'done']),
            "difficulty" => $this->faker->randomElement([1, 2, 3]),
            "due_date" => $this->faker->date("Y-m-d"),
            "closed_at" => $this->faker->boolean(50) ? $this->faker->date("Y-m-d") : null
        ];
    }
}
