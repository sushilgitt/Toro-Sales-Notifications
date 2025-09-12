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
        Schema::create('customizes', function (Blueprint $table) {
            $table->id();
            $table->string('TitleColor')->nullable();
            $table->string('DecriptionColor')->nullable();
            $table->string('BackgroundColor')->nullable();
            $table->string('ButtonColor')->nullable();
            $table->string('BorderColor')->nullable();
            $table->string('ButtonTextColor')->nullable();
            $table->string('rangeValuePadding')->nullable();
            $table->string('borderRadius')->nullable();
            $table->string('rangeValueWidth')->nullable();
            $table->string('selectedBackgroundImage')->nullable();
            $table->string('CloseButtonTextColor')->nullable();
            $table->boolean('checkedshedow')->nullable();
            $table->string('selectedhover')->nullable();
            $table->string('selectedentrance')->nullable();
            $table->string('selectedexit')->nullable();
            $table->string('selectedanimation')->nullable();
            $table->string('weight')->nullable();
            $table->string('displayRadio')->nullable();
            $table->string('shop')->nullable();
            $table->integer('coupon_id')->nullable();
            $table->string('TitleFontSize')->nullable();
           $table->string('DecriptionFontSize')->nullable();
           $table->string('CouponColor')->nullable();
           $table->string('CouponBgColor')->nullable();
           $table->string('CouponBorderColor')->nullable();
           $table->string('CouponBorderSize')->nullable();
           $table->string('CouponBorderStyle')->nullable();
           $table->string('verticalLine')->nullable();
            $table->string('copyButtonColor')->nullable();
            $table->string('copyButtonbgColor')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customizes');
    }
};
