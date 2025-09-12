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
        Schema::create('triggers', function (Blueprint $table) {
            $table->id();
            $table->boolean('checkedAllpage')->nullable();
            $table->string('fullUrl')->nullable();
            $table->string('cssSelector')->nullable();
            $table->string('displaytriggerType')->nullable();
            $table->string('displayFrequency')->nullable();
            $table->boolean('schedule')->nullable();
            $table->dateTime('startDate')->nullable();
            $table->dateTime('endDate')->nullable();
            $table->string('selectedpage')->nullable();
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
        Schema::dropIfExists('triggers');
    }
};
