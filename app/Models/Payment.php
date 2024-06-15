<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $table = 'payments';
    // protected $fillable = ['payment_date', 'expiration_date', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
