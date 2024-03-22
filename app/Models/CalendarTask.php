<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalendarTask extends Model
{
    use HasFactory;
    protected $table = 'calendar_tasks';
    protected $fillable = ['calendar_id', 'content', 'tag'];

    public function calendar()
    {
        return $this->belongsTo(Calendar::class);
    }
}
