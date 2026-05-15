<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('managed_pricing_subscription_id')->nullable()->after('plan_id');
            $table->string('managed_pricing_plan_name')->nullable()->after('managed_pricing_subscription_id');
            $table->string('managed_pricing_plan_handle')->nullable()->after('managed_pricing_plan_name');
            $table->string('managed_pricing_status')->nullable()->after('managed_pricing_plan_handle');
            $table->timestamp('managed_pricing_current_period_end')->nullable()->after('managed_pricing_status');
            $table->timestamp('managed_pricing_last_synced_at')->nullable()->after('managed_pricing_current_period_end');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'managed_pricing_subscription_id',
                'managed_pricing_plan_name',
                'managed_pricing_plan_handle',
                'managed_pricing_status',
                'managed_pricing_current_period_end',
                'managed_pricing_last_synced_at',
            ]);
        });
    }
};
