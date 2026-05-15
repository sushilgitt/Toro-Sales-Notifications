<?php

namespace App\Http\Controllers;

use App\Helper\MetafieldHelper;
use App\Helper\ShippingHelper;
use App\Models\Shipping;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ShippingController extends Controller
{

    // public function store(Request $request)
    // {
    //         $request->validate([
    //             'name' => 'required|string|max:255',
    //             'details' => 'required|array',
    //             'details.shippingamount' => 'required',
    //         ]);

    //         $user = Auth::user();
    //         $shippingActive = false;
    //         $start = $request->details['startdate'] ?? null;
    //         $end = $request->details['enddate'] ?? null;
    //         if ($start && $end) {
    //         $today = now();

    //         $startDate = \Carbon\Carbon::parse($start)->startOfDay();   
    //         $endDate   = \Carbon\Carbon::parse($end)->endOfDay();       

    //         $shippingActive = $today->between($startDate, $endDate);    
    //     }

    //         $shipping = Shipping::create([
    //             'shop' => $user->name,
    //             'name' => $request->name,
    //             'details' => json_encode($request->details),
    //             'shipping' => $shippingActive,
    //         ]);

    //         $metafieldData = [
    //             'shipping' => $shipping->shipping,
    //             'shippingamount' => $request->details['shippingamount'],
    //             'startdate' => $request->details['startdate'] ?? null,
    //             'enddate' => $request->details['enddate'] ?? null,
    //         ];

    //         $helper = new MetafieldHelper();
    //         $shopifyId = $helper->createDeliveryCustomization($user, $metafieldData,$shipping);

    //         if ($shopifyId) {
    //             $shipping->update(['deliverycustomizationid' => $shopifyId]);
    //         }

    //         return response()->json([
    //             'status' => 'success',
    //             'message' => 'Shipping/banner saved successfully',
    //             'data' => [
    //                     'shipping' => $shipping,
    //                     'shopify_deliverycustomization_id' => $shopifyId,
    //                 ],
    //         ]);
    // }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'details' => 'required|array',
            'details.shippingamount' => 'required',
        ]);

        $user = Auth::user();

        $start = $request->details['startdate'] ?? null;
        $end = $request->details['enddate'] ?? null;

        $today = now();
        $startDate = $start ? \Carbon\Carbon::parse($start)->startOfDay() : null;
        $endDate   = $end ? \Carbon\Carbon::parse($end)->endOfDay() : null;
        $shippingActive = $startDate && $endDate ? $today->between($startDate, $endDate, true) : false;

        $shipping = Shipping::updateOrCreate(
            ['shop' => $user->name], 
            [
                'name' => $request->name,
                'details' => json_encode($request->details),
                'shipping' => $shippingActive,
            ]
        );

        $shippingData = [
            'shop' => $user->name,
            'name' => $request->name,
            'shipping' => $shippingActive,
            'deliverycustomizationid' => $request->details['deliverycustomizationid'] ?? '',
            'details' => $request->details,
        ];

        $shippingHelper = new ShippingHelper();
        $success = $shippingHelper->saveShippingMetafield($user, $shippingData);

        if (!$success) {
            Log::error('Failed to save shipping/banner metafield', ['data' => $shippingData]);
        } else {
            Log::info('Shipping/banner metafield stored successfully', ['data' => $shippingData]);
        }

        $metafieldData = [
            'shipping' => $shipping->shipping,
            'shippingamount' => $request->details['shippingamount'],
            'startdate' => $request->details['startdate'] ?? null,
            'enddate' => $request->details['enddate'] ?? null,
        ];


        $helper = new MetafieldHelper();

        if ($shipping->deliverycustomizationid) {
            $helper->updateDeliveryCustomization($user, $shipping->deliverycustomizationid, $metafieldData, $shipping);
        } else {
            $shopifyId = $helper->createDeliveryCustomization($user, $metafieldData, $shipping);
            if ($shopifyId) {
                $shipping->update(['deliverycustomizationid' => $shopifyId]);
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Shipping/banner saved successfully',
            'data' => $shipping,
        ]);
    }

    public function getdata()
    {
        $userId = Auth::id();
        $user = User::find($userId)->name;

        $shippingbanner = Shipping::where('shop',$user)->get();

        return response()->json([
            'success' => true,
            'data' => $shippingbanner,
            'message' => 'Banners fetched successfully',
        ],200);
    }

    // public function getById($id)
    // {
    //     info('get single banner');

    //     $userId = Auth::id();
    //     $user = User::find($userId)->name;

    //     $banner = Shipping::where('shop', $user)->where('id', $id)->first();

    //     if (!$banner) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Banner not found',
    //         ], 404);
    //     }

    //     return response()->json([
    //         'success' => true,
    //         'data' => $banner,
    //         'message' => 'Banner fetched successfully',
    //     ], 200);
    // }

    public function getById()
    {
        $userId = Auth::id();
        $user = User::find($userId)->name;

        $banner = Shipping::where('shop', $user)->first();

        if (!$banner) {
            return response()->json([
                'success' => false,
                'message' => 'Banner not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $banner,
            'message' => 'Banner fetched successfully',
        ], 200);
    }


    // public function update(Request $request, $id)
    // {
    //         $request->validate([
    //             'name' => 'required|string|max:255',
    //             'details' => 'required|array',
    //             'details.shippingamount' => 'required',
    //         ]);

    //         $user = Auth::user();
    //         $shipping = Shipping::where('shop', $user->name)->where('id', $id)->firstOrFail();

    //         $shippingActive = false;
    //         $start = $request->details['startdate'] ?? null;
    //         $end = $request->details['enddate'] ?? null;
    //         if ($start && $end) {
    //         $today = now();

    //         $startDate = \Carbon\Carbon::parse($start)->startOfDay();   
    //         $endDate   = \Carbon\Carbon::parse($end)->endOfDay();       

    //         $shippingActive = $today->between($startDate, $endDate);
    //     }

    //         $shipping->update([
    //             'name' => $request->name,
    //             'details' => json_encode($request->details),
    //             'shipping' => $shippingActive,
    //         ]);

    //         if ($shipping->deliverycustomizationid) {
    //             $helper = new MetafieldHelper();
    //             $helper->updateDeliveryCustomization($user, $shipping->deliverycustomizationid, [
    //                 'shipping' => $shipping->shipping,
    //                 'shippingamount' => $request->details['shippingamount'],
    //                 'startdate' => $request->details['startdate'] ?? null,
    //                 'enddate' => $request->details['enddate'] ?? null,
    //             ],
    //             $shipping
    //         );
    //         }

    //         return response()->json([
    //             'status' => 'success',
    //             'message' => 'Shipping/banner updated successfully',
    //             'data' => $shipping,
    //         ], 200);

    // }

    public function destroy($id)
    {
        $user = Auth::user();
        $shipping = Shipping::where('shop', $user->name)->where('id', $id)->firstOrFail();

        if ($shipping->deliverycustomizationid) {
            $helper = new MetafieldHelper();
            $helper->deleteDeliveryCustomization($user, $shipping->deliverycustomizationid);
        }

        $shipping->delete();

        return response()->json(['success' => true]);
    }

    public function getShopCurrency(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not authenticated.',
            ], 401);
        }

        $user = User::find($user->id);
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found in database.',
            ], 404);
        }

        $api = $user->api();

        if (!$api) {
            return response()->json([
                'status' => 'error',
                'message' => 'Shopify API instance not available. Reauthenticate the shop.',
            ], 403);
        }

        $query = <<<GRAPHQL
        query {
            shop {
                currencyCode
                currencyFormats {
                    moneyFormat
                    moneyWithCurrencyFormat
                }
                currencySettings(first: 1) {
                    edges {
                        node {
                            currencyCode
                            rateUpdatedAt
                        }
                    }
                }
            }
        }
        GRAPHQL;

        $response = $api->graph($query);
        $responseArray = json_decode(json_encode($response), true);

        $shopData = $responseArray['body']['data']['shop'] ?? null;

        if (!$shopData) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch shop currency data.',
            ], 400);
        }

        $moneyFormat = $shopData['currencyFormats']['moneyFormat'] ?? '₹{{amount}}';
        $currencySymbol = str_replace('{{amount}}', '', $moneyFormat);
        $currencySymbol = trim($currencySymbol);

        // Log::info('Shop currency symbol: ' . $currencySymbol, ['user_id' => $user->id]);

        return response()->json([
            'status' => 'success',
            'data' => [
                'currencyCode' => $shopData['currencyCode'] ?? null,
                'moneyFormat' => $shopData['currencyFormats']['moneyFormat'] ?? null,
                'moneyWithCurrencyFormat' => $shopData['currencyFormats']['moneyWithCurrencyFormat'] ?? null,
                'currencySettings' => $shopData['currencySettings']['edges'][0]['node'] ?? null,
                'currencySymbol' => $currencySymbol,
            ],
        ]);
    }

}
