<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('todo_list_tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('todo_list_id');
            $table->foreign('todo_list_id')->references('id')->on('todo_lists')->onDelete('cascade');
            $table->string('content');
            $table->enum('status', ['todo', 'doing', 'done'])->default('todo');
            $table->unsignedTinyInteger('difficulty')->default(1)->between(1, 3);
            $table->string("due_date")->nullable();
            $table->string("closed_at")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todo_list_tasks');
    }
};
