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
        Schema::create('main_settings', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('file')->nullable();
            $table->text('subdescription')->nullable();
            $table->string('altText')->nullable();
            $table->string('couponCode')->nullable();
            $table->string('buttonText')->nullable();
            $table->boolean('checkedNewTab')->default(false);
            $table->string('ButtonURL')->nullable();
            $table->string('shop')->nullable();
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('main_settings');
    }
};
