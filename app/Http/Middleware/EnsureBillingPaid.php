<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Services\ManagedPricingService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureBillingPaid
{
    public function __construct(
        private readonly ManagedPricingService $managedPricingService
    ) {
    }

    public function handle(Request $request, Closure $next): Response
    {
        $shop = Auth::user();

        if ($shop instanceof User) {
            $billingState = $this->managedPricingService->syncShop($shop);

            if ($billingState['requires_billing'] ?? true) {
                return response()->json([
                    'status' => false,
                    'message' => 'A paid plan is required to use this app.',
                    'pricing_url' => $billingState['pricing_url'] ?? null,
                ], 402);
            }
        }

        return $next($request);
    }
}
