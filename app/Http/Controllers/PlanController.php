<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Shopify\Auth\Session as AuthSession;
use App\Helper\ShopifyPlanHelper;
use Shopify\Utils;
use App\Models\Session;
use App\Models\Plan;
use Shopify\Clients\Graphql;


class PlanController extends Controller
{

    public function getShopifyPlan(Request $request)
    {
        /** @var AuthSession */
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $client = new Graphql($session->getShop(), $session->getAccessToken());
        $query = <<<'QUERY'
       {
           shop {
               plan {
                   displayName
                   partnerDevelopment
               }
           }
       }
       QUERY;

        $response = $client->query(['query' => $query]);
        $responseBody = $response->getDecodedBody();

        $planName = $responseBody['data']['shop']['plan']['displayName'] ?? 'Free';
        $partnerDevelopment = $responseBody['data']['shop']['plan']['partnerDevelopment'] ?? false;
        $currentPlanId = Session::where('shop', $shop)->value('paidid');
        $is_Free = Session::where('shop', $shop)->value('is_free') ?? false;

        // if ($partnerDevelopment) {
        //     $planName = 'Free';
        //     $currentPlanId = 1; 
        // }

        return response()->json([
            'status' => true,
            'plan_name' => $planName,
            'current_plan_id' => $currentPlanId,
            'is_free' => $is_Free
        ]);
    }


    public function planSelect(Request $request)
    {
        /** @var AuthSession */
        $session = $request->get('shopifySession');
        $host = $request->query('host');
        $shop = $request->query('shop');
        $planId = (int)$request->query('planId');
        
        info($planId);
        info("planId");
        info($planId);

        //$planId = (int)$request->input('planName');
        
        // if($planId == 1) {
        //     return response()->json([
        //         "status" => 0,
        //         "data" => [
        //             "redirectUrl" => null,
        //             "message" => "The free plan is available only in the development store."
        //         ]
        //     ]);
        // }

        if ($planId === 1) {
            $sessionData = Session::where('shop', $shop)->first();
    
            if ($sessionData) {
                $sessionData->update([
                    'paidid' => $planId,
                    'is_free' => true, 
                ]);
            }
    
            $redirectUrl = Utils::getEmbeddedAppUrl($host);
    
            return response()->json([
                "status" => 1,
                "data" => [
                    "redirectUrl" => $redirectUrl,
                ],
            ]);
        }
    

        $config = match ($planId) {
            3 => [ // Advanced Plan
                'chargeName' => 'Advanced Plan',
                'amount' => 250.00,
                'currencyCode' => 'USD',
                'interval' => 'EVERY_30_DAYS',
                'returnUrl' => route('plan.approve', ["host" => $host, "shop" => $shop, "planId" => $planId]),
                'test' => false,
                'trialDays' => 1,
            ],
            4 => [
                'chargeName' => 'Staff Plan',
                'amount' => 500.00,
                'currencyCode' => 'USD',
                'interval' => 'EVERY_30_DAYS',
                'returnUrl' => route('plan.approve', ["host" => $host, "shop" => $shop, "planId" => $planId]),
                'test' => false,
                'trialDays' => 1,
            ],
            default => [ // Basic Plan
                'chargeName' => 'Basic Plan',
                'amount' => 100.00,
                'currencyCode' => 'USD',
                'interval' => 'EVERY_30_DAYS',
                'returnUrl' => route('plan.approve', ["host" => $host, "shop" => $shop, "planId" => $planId]),
                'test' => true,
                'trialDays' => 0,
            ],
        };

        $confirmationUrl = ShopifyPlanHelper::requestpayment($session, $config);
        if($confirmationUrl) {
            return response()->json([
                "status" => 1,
                "data" => [
                    "redirectUrl" => $confirmationUrl,
    
                ]
            ]);
        }
        return response()->json([
            "status" => 2,
            "data" => [
                "redirectUrl" => null,
                "message" => "Somthing worng"
            ]
        ]);

    }

    public function approvePlan(Request $request)
    {
        $host = $request->query('host');
        $shop = $request->query('shop');
        $charge_id = $request->query('charge_id');
        $planId = $request->query('planId');
        $session = Session::where('shop', $shop)->first();

        if ($session) {
            $session->update([
                'paidid' => $planId,
            ]);
        } else {
            return response()->json(['message' => 'Session not found'], 200);
        }

        $plan = Plan::where('shop', $shop)->first();

        if ($plan) {
            $plan->update([
                'charge_id' => $charge_id,
                'plan_id' => $planId,
                'shop' => $shop,
            ]);
        } else {
            Plan::create([
                'charge_id' => $charge_id,
                'plan_id' => $planId,
                'shop' => $shop,
            ]);
        }

        
        $redirectUrl = Utils::getEmbeddedAppUrl($host);
        return redirect($redirectUrl);
    }


    public function checkSubscription(Request $request)
    {
        /** @var AuthSession */
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $session = Session::where('shop', $shop)->first();
        return response()->json([
            'is_free' => $session->is_free,
            'paidid' => $session->paidid,
        ]);
    }
}