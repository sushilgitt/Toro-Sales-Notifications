<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;
    protected $fillable = [
        "charge_id",
        "plan_id",
        "shop"
    ];

    public function session()
    {
        // return $this->belongsTo(Session::class, 'shop');
        return $this->belongsTo(User::class, 'shop');

    }
}
