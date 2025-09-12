<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customize extends Model
{
   use HasFactory;

    protected $fillable = [
        'TitleColor',
        'DecriptionColor',
        'BackgroundColor',
        'ButtonColor',
        'BorderColor',
        'ButtonTextColor',
        'rangeValuePadding',
        'borderRadius',
        'rangeValueWidth',
        'selectedBackgroundImage',
        'CloseButtonTextColor',
        'checkedshedow',
        'selectedhover',
        'selectedentrance',
        'selectedexit',
        'selectedanimation',
        'weight',
        'displayRadio',
        'TitleFontSize',
        'DecriptionFontSize',
        'CouponColor',
        'CouponBgColor',
        'CouponBorderColor',
        'CouponBorderSize',
        'CouponBorderStyle',
        'verticalLine',
        'copyButtonColor',
        'copyButtonbgColor',
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
