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
        Schema::table('plans', function (Blueprint $table) {
            if (! Schema::hasColumn('plans', 'type')) {
                $table->string('type')->default('RECURRING')->after('id');
            }

            if (! Schema::hasColumn('plans', 'capped_amount')) {
                $table->decimal('capped_amount', 8, 2)->nullable()->after('price');
            }

            if (! Schema::hasColumn('plans', 'terms')) {
                $table->string('terms')->nullable()->after('capped_amount');
            }

            if (! Schema::hasColumn('plans', 'trial_days')) {
                $table->integer('trial_days')->nullable()->after('terms');
            }

            if (! Schema::hasColumn('plans', 'test')) {
                $table->boolean('test')->default(false)->after('trial_days');
            }

            if (! Schema::hasColumn('plans', 'on_install')) {
                $table->boolean('on_install')->default(false)->after('test');
            }

            if (! Schema::hasColumn('plans', 'interval')) {
                $table->string('interval')->nullable()->after('price');
            }
        });

        if (! Schema::hasTable('charges')) {
            Schema::create('charges', function (Blueprint $table) {
                $table->increments('id');
                $table->bigInteger('charge_id');
                $table->boolean('test')->default(false);
                $table->string('status')->nullable();
                $table->string('name')->nullable();
                $table->string('terms')->nullable();
                $table->string('type');
                $table->decimal('price', 8, 2);
                $table->string('interval')->nullable();
                $table->decimal('capped_amount', 8, 2)->nullable();
                $table->integer('trial_days')->nullable();
                $table->timestamp('billing_on')->nullable();
                $table->timestamp('activated_on')->nullable();
                $table->timestamp('trial_ends_on')->nullable();
                $table->timestamp('cancelled_on')->nullable();
                $table->timestamp('expires_on')->nullable();
                $table->unsignedBigInteger('plan_id')->nullable();
                $table->string('description')->nullable();
                $table->bigInteger('reference_charge')->nullable();
                $table->timestamps();
                $table->softDeletes();
                $table->unsignedBigInteger('user_id');
                $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
                $table->foreign('plan_id')->references('id')->on('plans');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('charges');
    }
};
