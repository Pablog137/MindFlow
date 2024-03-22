<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    use HasFactory;
    protected $table = 'calendars';
    protected $fillable = ['user_id'];


    public function users()
    {
        return $this->belongsTo(User::class);
    }

    public function calendarTasks()
    {
        return $this->hasMany(CalendarTask::class);
    }
}
