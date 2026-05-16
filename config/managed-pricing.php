<?php

return [
    'app_handle' => env('SHOPIFY_APP_HANDLE', 'coupon-code-8'),

    'free_plan_id' => 1,

    'default_paid_plan_id' => 2,

    'preferred_statuses' => [
        'ACTIVE',
        'ACCEPTED',
        'PENDING',
    ],

    'plan_aliases' => [
        'free' => 1,
        'starter' => 2,
        'basic' => 2,
        'pro' => 3,
        'advanced' => 3,
        'staff' => 4,
    ],
];
