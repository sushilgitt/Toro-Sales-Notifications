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
        Schema::create('displays', function (Blueprint $table) {
            $table->id();
            $table->string('triggerDirection')->nullable();
            $table->string('triggerType')->nullable();
            $table->integer('value')->nullable();
            $table->boolean('checkedClose')->default(false);
            $table->boolean('checkedBrand')->default(true);
            $table->string('shop')->nullable();
            $table->integer('coupon_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('displays');
    }
};
