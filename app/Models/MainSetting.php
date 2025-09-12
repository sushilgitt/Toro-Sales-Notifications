<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class MainSetting extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'title',
        'description',
        'file',
        'subdescription',
        'altText',
        'couponCode',
        'buttonText',
        'checkedNewTab',
        'ButtonURL',
        'shop',
        'status',
    ];

    protected $appends = ['image'];

    public function session()
    {
        // return $this->belongsTo(Session::class, 'shop');
        return $this->belongsTo(User::class, 'name');

    }
    // Define a scope to filter by status = 1
    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }

    public function displays()
    {
        return $this->hasOne(Display::class, 'coupon_id');
    }

    public function customizes()
    {
        return $this->hasOne(Customize::class, 'coupon_id');
    }

    public function triggers()
    {
        return $this->hasOne(Triggers::class, 'coupon_id');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('coupancodemainimage');
    }

    function getImageAttribute()
    {
        $mediaItems = $this->getMedia('coupancodemainimage');
        if (count($mediaItems) > 0) {
            $publicFullUrl = $mediaItems[0]->getFullUrl();
        } else {
            $publicFullUrl = '';
        }
        return $publicFullUrl;
    }
   
    
}
