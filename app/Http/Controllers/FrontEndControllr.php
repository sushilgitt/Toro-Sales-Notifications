<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\ManagedPricingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class FrontEndControllr extends Controller
{
    public function index(Request $request, ManagedPricingService $managedPricingService)
    {
        $shop = Auth::user();

        if ($shop instanceof User && $request->routeIs('home')) {
            try {
                $billingState = $managedPricingService->syncShop($shop);

                if (($billingState['is_free'] ?? true) && ! $request->boolean('skip_billing')) {
                    return redirect()->away($billingState['pricing_url']);
                }
            } catch (\Throwable $exception) {
                Log::warning('Unable to resolve managed pricing state for app shell.', [
                    'shop' => $shop->name,
                    'message' => $exception->getMessage(),
                ]);
            }
        }

        return view('welcome');
    }
}
