<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use App\Models\Payment;
use App\Models\Calendar;
use App\Models\TodoList;
use App\Models\CalendarTask;
use App\Models\TodoListTask;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

    
        // User::factory()->count(30)->state(['user_type' => 'user'])->create();
        // User::factory()->count(20)->state(['user_type' => 'premium'])->create();
        // User::factory()->count(3)->state(['user_type' => 'admin'])->create();
        // Payment::factory()->count(20)->create();


        // TodoList::factory()->count(1)->create();

        // TodoListTask::factory()->count(15)->create();

        // Calendar::factory()->count(1)->create();
        // CalendarTask::factory()->count(10)->create();

        // $gestor =  User::factory()->create([
        //     'name' => 'gestor',
        //     'email' => 'gestor@educastur.es',
        //     'password' => bcrypt('gestor'),
        // ]);


        // $role = Role::create(['name' => 'admin']);
        // $role2 = Role::create(['name' => 'gestor']);


        // $admin->assignRole($role);
        // $gestor->assignRole($role2);
    }
}
