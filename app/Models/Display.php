<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Display extends Model
{
     use HasFactory;
    protected $fillable = [
        'checkedClose',
        'checkedBrand',
        'triggerType',
        'triggerDirection',
        'value',
        'shop',
        'coupon_id',
    ];
    public function session()
    {
        // return $this->belongsTo(Session::class, 'shop');
        return $this->belongsTo(User::class, 'name');

    }
    public function mainSetting()
    {
        return $this->belongsTo(MainSetting::class, 'coupon_id');
    }
}
