<?php

namespace Database\Factories;

use App\Models\Calendar;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CalendarTaskFactory extends Factory
{

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

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */


    public function definition(): array
    {

        return [
            "calendar_id" => Calendar::all()->random()->id,
            "content" => $this->tasks[array_rand($this->tasks, 1)],
            "tag" => $this->faker->randomElement(['general', 'work', 'personal']),
        ];
    }
}
