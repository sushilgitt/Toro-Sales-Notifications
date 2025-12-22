<?php

namespace App\Helper;

use App\Models\Shipping;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class MetafieldHelper
{
    public function getOwnerId(User $user)
    {
        Log::info('Fetching Shopify Shop ID');

        $query = <<<GRAPHQL
        query {
            shop {
                id
            }
        }
        GRAPHQL;

        $response = $user->api()->graph($query);

        return $response['body']['data']['shop']['id'] ?? null;
    }

public function getShopifyFunctions(User $user): ?string
{
    Log::info('Fetching Shopify Functions');

    $query = <<<GRAPHQL
    query {
        shopifyFunctions(first: 100) {
            nodes {
                id
                title
                apiType
            }
        }
    }
    GRAPHQL;

    $response = $user->api()->graph($query);
    Log::info('GraphQL response', [
        'response' => $response
    ]);

    $nodes = json_decode(json_encode($response['body']['data']['shopifyFunctions']['nodes']), true);

    Log::info('All Shopify Functions', $nodes);

    $functionId = null;

    foreach ($nodes as $func) {
        if (($func['apiType'] ?? '') === 'delivery_customization') {
            $functionId = $func['id'];
            break;
        }
    }

    if ($functionId) {
        Log::info('Shopify Function ID found', ['function_id' => $functionId]);
    } else {
        Log::error('Delivery Function ID not found');
    }

    return $functionId;
}



public function createDeliveryCustomization(User $user, array $metafieldData ,Shipping $shipping): ?string
    {
        info('createdelivery');
        $functionId = $this->getShopifyFunctions($user);
        if (!$functionId) return null;

        $mutation = <<<GRAPHQL
        mutation deliveryCustomizationCreate(\$deliveryCustomization: DeliveryCustomizationInput!) {
            deliveryCustomizationCreate(deliveryCustomization: \$deliveryCustomization) {
                deliveryCustomization { id }
                userErrors { message }
            }
        }
        GRAPHQL;

        $variables = [
            'deliveryCustomization' => [
                'title' => 'Free Shipping Rule',
                'functionId' => $functionId,
                'enabled' => true,
                'metafields' => [[
                    'namespace' => '$app:delivery-customization',
                    'key' => 'free_shipping_threshold',
                    'type' => 'json',
                    'value' => json_encode([
                        'shipping' => (bool) $shipping->shipping,
                        'shippingamount' => (float) $metafieldData['shippingamount'],
                        'start_date' => $metafieldData['startdate'],
                        'end_date' => $metafieldData['enddate'],
                    ]),
                ]],
            ]
        ];

        $response = $user->api()->graph($mutation, $variables);

        $responseArray = json_decode(json_encode($response), true);
        Log::info('Shopify deliveryCustomizationCreate response', [
            'response' => $responseArray,
            'user_id' => $user->id,
            'variables' => $variables,
        ]);

        return $response['body']['data']['deliveryCustomizationCreate']['deliveryCustomization']['id'] ?? null;
    }

    public function updateDeliveryCustomization(User $user, string $deliveryCustomizationId, array $metafieldData,Shipping $shipping): bool
    {
        $mutation = <<<GRAPHQL
        mutation deliveryCustomizationUpdate(\$id: ID!, \$deliveryCustomization: DeliveryCustomizationInput!) {
            deliveryCustomizationUpdate(id: \$id, deliveryCustomization: \$deliveryCustomization) {
                deliveryCustomization { id }
                userErrors { message }
            }
        }
        GRAPHQL;

        $variables = [
            'id' => $deliveryCustomizationId,
            'deliveryCustomization' => [
                'title' => 'Free Shipping Rule',
                'enabled' => true,
                'metafields' => [[
                    'namespace' => '$app:delivery-customization',
                    'key' => 'free_shipping_threshold',
                    'type' => 'json',
                    'value' => json_encode([
                        'shipping' => (bool) $metafieldData['shipping'],
                        'shippingamount' => (float) $metafieldData['shippingamount'],
                        'start_date' => $metafieldData['startdate'],
                        'end_date' => $metafieldData['enddate'],
                    ]),
                ]],
            ],
        ];

        $response = $user->api()->graph($mutation, $variables);
        $responseArray = json_decode(json_encode($response), true);

    Log::info('Shopify deliveryCustomizationUpdate response', [
        'response' => $responseArray,
        'user_id' => $user->id
    ]);

    $errors = $responseArray['body']['data']['deliveryCustomizationUpdate']['userErrors'] ?? [];

    if (!empty($errors)) {
        Log::error('Shopify deliveryCustomizationUpdate failed', [
            'errors' => $errors,
            'user_id' => $user->id
        ]);
        return false;
    }

    return true;
    }

    public function deleteDeliveryCustomization(User $user, string $deliveryCustomizationId): bool
    {
        $mutation = <<<GRAPHQL
        mutation deliveryCustomizationDelete(\$id: ID!) {
            deliveryCustomizationDelete(id: \$id) {
                deletedId
                userErrors { message }
            }
        }
        GRAPHQL;

        $response = $user->api()->graph($mutation, ['id' => $deliveryCustomizationId]);

        $responseArray = json_decode(json_encode($response), true);

        $errors = $responseArray['body']['data']['deliveryCustomizationDelete']['userErrors'] ?? [];
        if (!empty($errors)) {
            Log::error('Shopify deliveryCustomizationDelete failed', [
                'errors' => $errors,
                'user_id' => $user->id
            ]);
            return false;
        }

        $deletedId = $responseArray['body']['data']['deliveryCustomizationDelete']['deletedId'] ?? null;
        Log::info('Shopify deliveryCustomization deleted successfully', [
            'deletedId' => $deletedId,
            'user_id' => $user->id
        ]);

        return $deletedId !== null;
    }



}
