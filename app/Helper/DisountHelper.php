<?php

namespace App\Helper;

use App\Models\Campaign;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class DisountHelper
{
    protected $user;
    protected $campaign;

    public function __construct(User $user, Campaign $campaign)
    {
        $this->user = $user;
        $this->campaign = $campaign;
    }

    public function getOwnerId(User $user)
    {
        $query = 'query getShopId { shop { id } }';
        $api = $user->api();
        $response = $api->graph($query);

        return $response['body']['data']['shop']['id'] ?? null;
    }

    public function getShopifyFunctions(): ?string
    {
        $query = <<<'GRAPHQL'
        query {
            shopifyFunctions(first: 25) {
                nodes {
                    id
                    title
                    apiType
                }
            }
        }
        GRAPHQL;

        $api = $this->user->api();
        $response = $api->graph($query);

        $functions = $response['body']['data']['shopifyFunctions']['nodes'] ?? [];
        return $functions[0]['id'] ?? null;
    }

    public function setDiscountMetafeild()
    {
        $functionId = $this->getShopifyFunctions();
        $campaign = $this->campaign;

        $tiers = is_string($campaign->tiers) ? json_decode($campaign->tiers, true) : $campaign->tiers;
        $productGIDs = is_string($campaign->specific_product) ? json_decode($campaign->specific_product, true) : $campaign->specific_product;
        $collections = is_string($campaign->collection) ? json_decode($campaign->collection, true) : ($campaign->collection ?? []);
        $productsString = (string) $campaign->products;
        $collectionGIDs = array_map(fn($id) => "gid://shopify/Collection/$id", $collections);
        $conditions = is_string($campaign->conditions) ? json_decode($campaign->conditions, true) : $campaign->conditions;

        $buyxTiers = is_string($campaign->buyx_tiers) ? json_decode($campaign->buyx_tiers, true) : ($campaign->buyx_tiers ?? []);
        $buyItems  = is_string($campaign->buy_items) ? json_decode($campaign->buy_items, true) : ($campaign->buy_items ?? []);
        $getItems  = is_string($campaign->get_items) ? json_decode($campaign->get_items, true) : ($campaign->get_items ?? []);


        $discountMetaValue = [
            'discountId'    => $campaign->discountid ?? null,
            'campaignId'    => $campaign->id,
            'discountTitle' => $campaign->discount_title ?? "Cart Discount",
            'products'      => $productsString,
            'collectionIds' => $collections,
            'productIds'    => $productGIDs,
            'tiers'         => $tiers,
            'lifetime'      => (bool) $campaign->lifetime,
            'customer_limit' => $campaign->customer_limit !== null ? (int) $campaign->customer_limit : null,
            'discount_type' => $campaign->discount_type ?? 'product',
            'conditions'     => $conditions,

            'buyx_tiers' => $buyxTiers,
            'buy_type'   => $campaign->buy_type ?? null,
            'get_type'   => $campaign->get_type ?? null,
            'buy_items'  => $buyItems,
            'get_items'  => $getItems,
        ];

        $collectionData = [
                'collectionIds' => $collectionGIDs ?? [],
            ];

         if ($campaign->buy_type === 'collections' && !empty($buyItems)) {
            $collectionData['buyxCollections'] = array_map(
                fn($id) => "gid://shopify/Collection/$id",
                is_array($buyItems) ? $buyItems : json_decode($buyItems, true)
            );
        }

        if ($campaign->get_type === 'collections' && !empty($getItems)) {
            $collectionData['getxCollections'] = array_map(
                fn($id) => "gid://shopify/Collection/$id",
                is_array($getItems) ? $getItems : json_decode($getItems, true)
            );
        }


        $appliesOnOneTimePurchase = (bool) $campaign->lifetime;
        $appliesOnSubscription = !$appliesOnOneTimePurchase;

        // $recurringCycleLimit = $campaign->customer_limit !== null ? (int) $campaign->customer_limit : null;


        $metafields = [];

        if (!empty($campaign->discountid)) {
            $existingMetafields = $this->getExistingMetafields( $campaign->discountid);

            $findMetafield = function ($metafields, $key) {
                foreach ($metafields as $mf) {
                    if ($mf['key'] === $key) {
                        return [
                            'id' => $mf['id'],
                            'namespace' => $mf['namespace']
                        ];
                    }
                }
                return null;
            };

            $configMetafield = $findMetafield($existingMetafields, 'config');
            $collectionMetafield = $findMetafield($existingMetafields, 'collectionIds');

            $metafields[] = [
                'id' => $configMetafield['id'] ?? null,
                'namespace' => $configMetafield['namespace'] ?? 'discounts',
                'key' => 'config',
                'type' => 'json',
                'value' => json_encode($discountMetaValue)
            ];

            $metafields[] = [
                'id' => $collectionMetafield['id'] ?? null,
                'namespace' => $collectionMetafield['namespace'] ?? '$app:discounts',
                'key' => 'collectionIds',
                'type' => 'json',
                'value' => json_encode($collectionData)
            ];

            $automaticAppDiscount = [
                "title" => $campaign->discount_title ?? "Cart Discount",
                "functionId" => $functionId,
                "discountClasses" => ["PRODUCT","ORDER","SHIPPING"],
                "startsAt" => $campaign->start_date ?? now()->toISOString(),
                "endsAt" => $campaign->end_date ?? null,
                "combinesWith" => [
                    "orderDiscounts" => true,
                    "productDiscounts" => true,
                    "shippingDiscounts" => true,
                ],
                // "recurringCycleLimit" => $recurringCycleLimit,
                "metafields" => $metafields,
                "appliesOnOneTimePurchase" => $appliesOnOneTimePurchase,
                "appliesOnSubscription" => $appliesOnSubscription,
            ];
          
            $mutation = <<<'GRAPHQL'
                mutation discountAutomaticAppUpdate($automaticAppDiscount: DiscountAutomaticAppInput!, $id: ID!) {
                    discountAutomaticAppUpdate(automaticAppDiscount: $automaticAppDiscount, id: $id) {
                        automaticAppDiscount { discountId title status startsAt endsAt }
                        userErrors { field message }
                    }
                }
            GRAPHQL;

            $variables = [
                'automaticAppDiscount' => $automaticAppDiscount,
                'id' => $campaign->discountid
            ];

        } else {
            $automaticAppDiscount = [
                "title" => $campaign->discount_title ?? "Cart Discount",
                "functionId" => $functionId,
                "discountClasses" => ["PRODUCT","ORDER","SHIPPING"],
                "startsAt" => $campaign->start_date ?? now()->toISOString(),
                "endsAt" => $campaign->end_date ?? null,
                "combinesWith" => [
                    "orderDiscounts" => true,
                    "productDiscounts" => true,
                    "shippingDiscounts" => true,
                ],
                // "recurringCycleLimit" => $recurringCycleLimit,
                "metafields" => [
                    [
                        'namespace' => 'discounts',
                        'key' => 'config',
                        'type' => 'json',
                        'value' => json_encode($discountMetaValue)
                    ],
                    [
                        'namespace' => '$app:discounts',
                        'key' => 'collectionIds',
                        'type' => 'json',
                        'value' => json_encode($collectionData)
                    ]
                    ],
                    "appliesOnOneTimePurchase" => $appliesOnOneTimePurchase,
                    "appliesOnSubscription" => $appliesOnSubscription,
            ];


            $mutation = <<<'GRAPHQL'
                mutation discountAutomaticAppCreate($automaticAppDiscount: DiscountAutomaticAppInput!) {
                    discountAutomaticAppCreate(automaticAppDiscount: $automaticAppDiscount) {
                        automaticAppDiscount { discountId title status startsAt endsAt }
                        userErrors { field message }
                    }
                }
            GRAPHQL;

            $variables = ['automaticAppDiscount' => $automaticAppDiscount];
        }

        $mutationResponse = $this->user->api()->graph($mutation, $variables);
        $responseArray = $mutationResponse['body']->toArray();

        $data = $responseArray['data'] ?? null;

        $userErrors = $data['discountAutomaticAppCreate']['userErrors']
            ?? $data['discountAutomaticAppUpdate']['userErrors']
            ?? [];

        if (!empty($userErrors)) {
            return false;
        }

        $discountId = $data['discountAutomaticAppCreate']['automaticAppDiscount']['discountId'] ??
            $data['discountAutomaticAppUpdate']['automaticAppDiscount']['discountId'] ??
            $campaign->discountid;

        if ($discountId && $campaign->discountid != $discountId) {
            $campaign->discountid = $discountId;
            $campaign->save();
        }

        return true;
    }

    public function getExistingMetafields( $discountId)
    {
        $namespaces = ['discounts', '$app:discounts'];
        $metafields = [];

        foreach ($namespaces as $namespace) {
            $query = <<<'GRAPHQL'
            query discountMetafields($id: ID!, $namespace: String!) {
                discountNode(id: $id) {
                    metafields(first: 50, namespace: $namespace) {
                        edges {
                            node {
                                id
                                namespace
                                key
                                value
                                type
                            }
                        }
                    }
                }
            }
            GRAPHQL;

            $response = $this->user->api()->graph($query, ['id' => $discountId, 'namespace' => $namespace]);
            $edges = $response['body']['data']['discountNode']['metafields']['edges'] ?? [];

            foreach ($edges as $edge) {
                $node = $edge['node'];
                $metafields[] = [
                    'id' => $node['id'],
                    'namespace' => $node['namespace'],
                    'key' => $node['key'],
                    'type' => $node['type'],
                    'value' => $node['value']
                ];
            }
        }

        return $metafields;
    }

    public function deleteDiscount(User $user, string $discountId): bool
    {
        if (empty($discountId)) {
            return false;
        }

        $api = $user->api();

        $mutation = <<<'GRAPHQL'
        mutation discountAutomaticDelete($id: ID!) {
            discountAutomaticDelete(id: $id) {
                deletedAutomaticDiscountId
                userErrors {
                    field
                    code
                    message
                }
            }
        }
        GRAPHQL;

        try {
            $response = $api->graph($mutation, ['id' => $discountId]);
            $result = $response['body']['data']['discountAutomaticDelete'] ?? null;

            // if (!empty($result['userErrors'])) {
            //     Log::error("Failed to delete discount {$discountId}", [
            //         'errors' => $result['userErrors']
            //     ]);
            //     return false;
            // }

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}
