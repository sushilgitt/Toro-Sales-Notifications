<?php

namespace App\Helper;

use App\Models\User;
use Illuminate\Support\Facades\Log;

class ShippingHelper
{
    public function getOwnerId(User $user): ?string
    {
        Log::info('Fetching Shopify Shop ID');

        $query = <<<'GRAPHQL'
        query {
            shop {
                id
            }
        }
        GRAPHQL;

        try {
            $response = $user->api()->graph($query);

            Log::info('Shopify GraphQL Response (shop id)', [
                'response' => $response,
            ]);

            // Support both array-access and object-access depending on the SDK
            $body = $response['body'] ?? null;
            if (is_object($body) && isset($body->data->shop->id)) {
                return $body->data->shop->id;
            }

            if (is_array($body) && isset($body['data']['shop']['id'])) {
                return $body['data']['shop']['id'];
            }

            Log::error('Shop ID not found in GraphQL response structure', [
                'response_body' => $body,
            ]);

            return null;
        } catch (\Throwable $e) {
            Log::error('Exception while fetching Shopify Shop ID', [
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }

    // public function shippingstore(User $user, array $shipping): bool
    // {
    //     $ownerId = $this->getOwnerId($user);

    //     if (!$ownerId) {
    //         Log::error('Shop ID not found for metafield storage');
    //         return false;
    //     }

    //     $value = [
    //         'shop'                    => $shipping['shop'] ?? '',
    //         'name'                    => $shipping['name'] ?? '',
    //         'shipping_active'         => $shipping['shipping'] ?? false,
    //         'deliverycustomizationid' => $shipping['deliverycustomizationid'] ?? '',
    //         'details'                 => $shipping['details'] ?? [],
    //     ];

    //     $query = <<<'GRAPHQL'
    //     mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
    //         metafieldsSet(metafields: $metafields) {
    //             metafields {
    //                 id
    //                 namespace
    //                 key
    //                 value
    //                 type
    //                 createdAt
    //                 updatedAt
    //             }
    //             userErrors {
    //                 field
    //                 message
    //                 code
    //             }
    //         }
    //     }
    //     GRAPHQL;

    //     $variables = [
    //         'metafields' => [
    //             [
    //                 'ownerId'   => $ownerId,
    //                 'namespace' => 'shipping_banner',
    //                 'key'       => 'config',
    //                 'type'      => 'json',           
    //                 'value'     => json_encode($value), 
    //             ],
    //         ],
    //     ];

    //     try {
    //         $api = $user->api();
    //         $response = $api->graph($query, $variables);
    //         $body = $response['body'] ?? null;

    //         $result = is_array($body) ? $body['data']['metafieldsSet'] ?? [] :
    //                   (is_object($body) ? (array) $body->data->metafieldsSet : []);

    //         $userErrors = json_decode(json_encode($result['userErrors'] ?? []), true);
    //         if (!empty($userErrors)) {
    //             Log::error('Shopify metafield user errors', ['errors' => $userErrors]);
    //             return false;
    //         }

    //         Log::info('Shipping/banner metafield stored successfully', [
    //             'ownerId'   => $ownerId,
    //             'namespace' => 'shipping_banner',
    //             'key'       => 'config'
    //         ]);

    //         return true;

    //     } catch (\Throwable $e) {
    //         Log::error('Exception storing Shopify metafield', [
    //             'error'   => $e->getMessage(),
    //             'trace'   => $e->getTraceAsString(),
    //             'user_id' => $user->id ?? null,
    //         ]);
    //         return false;
    //     }
    // }

    
    public function saveShippingMetafield(User $user, array $shipping): bool
    {
        $ownerId = $this->getOwnerId($user);

        if (!$ownerId) {
            Log::error('Shop ID not found for metafield storage');
            return false;
        }

        $value = [
            'shop'                    => $shipping['shop'] ?? '',
            'name'                    => $shipping['name'] ?? '',
            'shipping_active'         => $shipping['shipping'] ?? false,
            'deliverycustomizationid' => $shipping['deliverycustomizationid'] ?? '',
            'details'                 => $shipping['details'] ?? [],
        ];

        $query = <<<'GRAPHQL'
        mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
            metafieldsSet(metafields: $metafields) {
                metafields {
                    id
                    namespace
                    key
                    value
                    type
                    createdAt
                    updatedAt
                }
                userErrors {
                    field
                    message
                    code
                }
            }
        }
        GRAPHQL;

        $variables = [
            'metafields' => [
                [
                    'ownerId'   => $ownerId,
                    'namespace' => 'shipping_banner',
                    'key'       => 'config',
                    'type'      => 'json',
                    'value'     => json_encode($value),
                ],
            ],
        ];

        try {
            $api = $user->api();
            $response = $api->graph($query, $variables);
            $body = $response['body'] ?? null;

            $result = is_array($body) ? $body['data']['metafieldsSet'] ?? [] :
                      (is_object($body) ? (array) $body->data->metafieldsSet : []);

            $userErrors = json_decode(json_encode($result['userErrors'] ?? []), true);

            if (!empty($userErrors)) {
                Log::error('Shopify metafield user errors', ['errors' => $userErrors]);
                return false;
            }

            Log::info('Shipping/banner metafield saved successfully', [
                'ownerId' => $ownerId,
                'namespace' => 'shipping_banner',
                'key' => 'config',
            ]);

            return true;

        } catch (\Throwable $e) {
            Log::error('Exception storing Shopify metafield', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'user_id' => $user->id ?? null,
            ]);
            return false;
        }
    }
}