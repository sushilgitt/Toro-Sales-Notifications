<?php

namespace App\Services;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use RuntimeException;

class ManagedPricingService
{
    public function pricingPlansUrl(string $shopDomain): string
    {
        $shopHandle = Str::before($shopDomain, '.myshopify.com');
        $appHandle = config('managed-pricing.app_handle');

        return "https://admin.shopify.com/store/{$shopHandle}/charges/{$appHandle}/pricing_plans";
    }

    public function syncShop(User $shop): array
    {
        $query = <<<'GRAPHQL'
        {
          shop {
            plan {
              displayName
              partnerDevelopment
            }
          }
          currentAppInstallation {
            activeSubscriptions {
              id
              name
              status
              test
              trialDays
              createdAt
              currentPeriodEnd
            }
          }
        }
        GRAPHQL;

        $response = $shop->api()->graph($query);
        $payload = json_decode(json_encode($response), true);
        $data = Arr::get($payload, 'body.data', Arr::get($payload, 'data'));
        $errors = Arr::get($payload, 'body.errors', Arr::get($payload, 'errors', []));

        if (! empty($errors)) {
            $message = Arr::get($errors, '0.message', 'Unable to sync managed pricing details.');

            throw new RuntimeException($message);
        }

        $subscriptions = Arr::get($data, 'currentAppInstallation.activeSubscriptions', []);
        $subscription = $this->pickSubscription($subscriptions);
        $partnerDevelopment = (bool) Arr::get($data, 'shop.plan.partnerDevelopment', false);
        $shopPlanName = Arr::get($data, 'shop.plan.displayName', 'Free');
        $subscriptionStatus = Arr::get($subscription, 'status');
        $hasPaidSubscription = in_array($subscriptionStatus, ['ACTIVE', 'ACCEPTED'], true);

        $planName = $hasPaidSubscription
            ? ($subscription['name'] ?? 'Paid')
            : ($partnerDevelopment ? 'Development' : 'Free');
        $planHandle = $this->normalizePlanHandle($planName);
        $planId = $this->resolvePlanId($planHandle, null, $hasPaidSubscription, $partnerDevelopment);
        $isFree = ! $hasPaidSubscription;
        $currentPeriodEnd = Arr::get($subscription, 'currentPeriodEnd');

        $shop->forceFill([
            'managed_pricing_subscription_id' => Arr::get($subscription, 'id'),
            'managed_pricing_plan_name' => $planName,
            'managed_pricing_plan_handle' => $planHandle,
            'managed_pricing_status' => $subscriptionStatus ?? ($partnerDevelopment ? 'DEVELOPMENT' : 'FREE'),
            'managed_pricing_current_period_end' => $currentPeriodEnd ? Carbon::parse($currentPeriodEnd) : null,
            'managed_pricing_last_synced_at' => now(),
        ])->save();

        return [
            'plan_name' => $planName,
            'plan_handle' => $planHandle,
            'current_plan_id' => $planId,
            'is_free' => $isFree,
            'subscription_id' => Arr::get($subscription, 'id'),
            'subscription_status' => Arr::get($subscription, 'status'),
            'current_period_end' => $currentPeriodEnd,
            'shop_plan_name' => $shopPlanName,
            'partner_development' => $partnerDevelopment,
            'pricing_url' => $this->pricingPlansUrl($shop->name),
        ];
    }

    public function syncShopDomain(string $shopDomain): ?array
    {
        $shop = User::where('name', $shopDomain)->first();

        if (! $shop) {
            return null;
        }

        return $this->syncShop($shop);
    }

    private function pickSubscription(array $subscriptions): ?array
    {
        if ($subscriptions === []) {
            return null;
        }

        $preferredStatuses = config('managed-pricing.preferred_statuses', []);

        usort($subscriptions, function (array $left, array $right) use ($preferredStatuses) {
            $leftWeight = array_search($left['status'] ?? null, $preferredStatuses, true);
            $rightWeight = array_search($right['status'] ?? null, $preferredStatuses, true);

            return ($leftWeight === false ? 999 : $leftWeight) <=> ($rightWeight === false ? 999 : $rightWeight);
        });

        return $subscriptions[0];
    }

    private function normalizePlanHandle(?string $planName): ?string
    {
        if (! $planName) {
            return null;
        }

        return Str::slug(Str::lower($planName));
    }

    private function resolvePlanId(?string $planHandle, ?int $existingPlanId, bool $hasPaidSubscription, bool $partnerDevelopment): int
    {
        if (! $hasPaidSubscription) {
            return (int) config('managed-pricing.free_plan_id', 1);
        }

        $planAliases = config('managed-pricing.plan_aliases', []);

        if ($planHandle && array_key_exists($planHandle, $planAliases)) {
            return (int) $planAliases[$planHandle];
        }

        if ($existingPlanId) {
            return (int) $existingPlanId;
        }

        if ($partnerDevelopment) {
            return (int) config('managed-pricing.free_plan_id', 1);
        }

        return (int) config('managed-pricing.default_paid_plan_id', 2);
    }
}
