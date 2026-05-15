<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Shopify\Auth\Session as AuthSession;
use App\Services\ManagedPricingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;
use Shopify\Utils;


class PlanController extends Controller
{
    public function __construct(
        private readonly ManagedPricingService $managedPricingService
    ) {
    }

    public function getShopifyPlan(Request $request): JsonResponse
    {
        /** @var AuthSession */
        $session = $request->get('shopifySession');
        $billingState = $this->managedPricingService->syncShopDomain($session->getShop());

        return response()->json([
            'status' => true,
            ...$this->formatBillingState($billingState),
        ]);
    }


    public function planSelect(Request $request): JsonResponse
    {
        /** @var AuthSession */
        $session = $request->get('shopifySession');
        $shop = $session->getShop();
        $redirectUrl = $this->managedPricingService->pricingPlansUrl($shop);

        return response()->json([
            'status' => 1,
            'data' => [
                'redirectUrl' => $redirectUrl,
                'message' => 'Redirect the merchant to Shopify managed pricing.',
            ],
        ]);
    }

    public function approvePlan(Request $request): RedirectResponse
    {
        return $this->handlePricingRedirect($request);
    }


    public function planSuccess(Request $request): RedirectResponse
    {
        return $this->handlePricingRedirect($request);
    }

    public function checkSubscription(Request $request): JsonResponse
    {
        /** @var AuthSession */
        $session = $request->get('shopifySession');
        $billingState = $this->managedPricingService->syncShopDomain($session->getShop());

        return response()->json([
            ...$this->formatBillingState($billingState),
        ]);
    }

    public function subscriptionWebhook(Request $request): Response
    {
        $this->abortUnlessValidWebhook($request);

        $shopDomain = (string) $request->header('X-Shopify-Shop-Domain');

        if ($shopDomain !== '') {
            $this->managedPricingService->syncShopDomain($shopDomain);
        }

        return response('OK', 200);
    }

    private function handlePricingRedirect(Request $request): RedirectResponse
    {
        $shop = (string) $request->query('shop', $request->input('shop', ''));

        if ($shop !== '') {
            $this->managedPricingService->syncShopDomain($shop);
        }

        return redirect()->away($this->resolveAppRedirectUrl($request));
    }

    private function resolveAppRedirectUrl(Request $request): string
    {
        $host = (string) $request->query('host', $request->input('host', ''));
        $shop = (string) $request->query('shop', $request->input('shop', ''));

        if ($host !== '') {
            return Utils::getEmbeddedAppUrl($host);
        }

        $parameters = array_filter([
            'shop' => $shop ?: null,
            'host' => $host ?: null,
        ]);

        if (Route::has('authenticate')) {
            return route('authenticate', $parameters);
        }

        return '/';
    }

    private function abortUnlessValidWebhook(Request $request): void
    {
        $header = (string) $request->header('X-Shopify-Hmac-Sha256');
        $payload = $request->getContent();
        $secret = (string) config('shopify-app.api_secret');
        $computed = base64_encode(hash_hmac('sha256', $payload, $secret, true));

        abort_unless($header !== '' && hash_equals($computed, $header), 401);
    }

    private function formatBillingState(?array $billingState): array
    {
        $billingState ??= [];

        return [
            'plan_name' => Arr::get($billingState, 'plan_name', 'Free'),
            'plan_handle' => Arr::get($billingState, 'plan_handle'),
            'current_plan_id' => Arr::get($billingState, 'current_plan_id', 1),
            'is_free' => Arr::get($billingState, 'is_free', true),
            'subscription_id' => Arr::get($billingState, 'subscription_id'),
            'subscription_status' => Arr::get($billingState, 'subscription_status'),
            'current_period_end' => Arr::get($billingState, 'current_period_end'),
            'partner_development' => Arr::get($billingState, 'partner_development', false),
            'pricing_url' => Arr::get($billingState, 'pricing_url'),
        ];
    }
}
