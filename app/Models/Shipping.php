<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    protected $table = 'shippings';

    protected $fillable=[ 'shop','name','details','deliverycustomizationid','shipping'];

    protected $casts = [
        'shipping' => 'boolean',
        // 'details' => 'array',
    ];
}
