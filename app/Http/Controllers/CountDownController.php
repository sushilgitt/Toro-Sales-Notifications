<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class CountDownController extends Controller
{
     public function storeBanner(Request $request)
     {
                $userId = Auth::id();
                $user = User::find($userId)->name;
        
                // $session = $request->get('shopifySession');
    
                if (!$user) {
                    return response()->json([
                        'success' => false,
                        'message' => 'user not found',
                    ], 401);
                }

                //  $shop = $session->getShop();

                $name = $request->input('name', null);
                $details = $request->input('details', []);

                if (!is_array($details)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Invalid details format. Expected an object or array.',
                    ], 422);
                }

                if (array_keys($details) !== range(0, count($details) - 1)) {
                    $details = [ $details ];
                }

                // $detailsJson = json_encode($details);

                $banner = new Banner();
                $banner->shop = $user;
                $banner->name = $name;
                $banner->details = $details;  
                $banner->save();

                return response()->json([
                    'success' => true,
                    'data' => $banner->fresh(),
                    'message' => 'Banner created successfully',
                ], 201);
    }

    public function getbanner(Request $request)
    {
            // $session = $request->get('shopifySession');
             $userId = Auth::id();
             $user = User::find($userId)->name;

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'user not found',
                ], 401);
            }

            // $shop = $session->getShop();

            $banners = Banner::where('shop', $user)->get();

            return response()->json([
                'success' => true,
                'data' => $banners,
                'message' => 'Banners fetched successfully',
            ], 200);
    }

    public function getbannerid(Request $request,$id)
    {
        // $session = $request->get('shopifySession');
        // $shop = $session->getShop();

        $userId = Auth::id();
        $user = User::find($userId)->name;

        $banner = Banner::where('id', $id)->where('shop', $user)->first();

        return response()->json([
            'success' => true,
            'data' => $banner,
            'message' => 'Banner fetched successfully',
        ], 200);
    }

    public function updatebanner(Request $request,$id)
    {
        // $session = $request->get('shopifySession');
        // $shop = $session->getShop();

        $userId = Auth::id();
        $user = User::find($userId)->name;

        $name = $request->input('name', null);
        $details = $request->input('details', []);

        if (array_keys($details) !== range(0, count($details) - 1)) {
            $details = [$details];
        }

        $banner = Banner::where('id', $id)->where('shop', $user)->first();

        if ($name !== null) {
            $banner->name = $name;
        }

        $banner->details = $details;

        $banner->save();

        return response()->json([
            'success' => true,
            'data' => $banner->fresh(),
            'message' => 'Banner updated successfully',
        ], 200);
    }

    public function deletebanner(Request $request, $id)
    {
            // $session = $request->get('shopifySession');

            // $shop = $session->getShop();

            $userId = Auth::id();
            $user = User::find($userId)->name;

            $banner = Banner::where('id', $id)->where('shop', $user)->first();

            $banner->delete();

            return response()->json([
                'success' => true,
                'message' => 'Banner deleted successfully',
            ], 200);
    }
}
