<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Triggers extends Model
{
    use HasFactory;
    protected $fillable = [
        'checkedAllpage',
        'fullUrl',
        'cssSelector',
        'displaytriggerType',
        'displayFrequency',
        'schedule',
        'startDate',
        'endDate',
        'selectedpage',
        'shop',
        'coupon_id',
    ];
    public function session()
    {
        // return $this->belongsTo(Session::class, 'shop');
        return $this->belongsTo(User::class, 'shop');

    }
    public function mainSetting()
    {
        return $this->belongsTo(MainSetting::class, 'coupon_id');
    }
}
