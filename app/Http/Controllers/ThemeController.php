<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ThemeController extends Controller
{
    public function getThemeFile(Request $request)
    {
        $shopname = User::where('id', Auth::id())->first()->name;
        $user = User::where('id', Auth::id())->first();
        $api = $user->api();
        $access_token = User::where('name', $shopname)->first()->password;
        $query = 'query {
                themes(first: 5 roles: MAIN) {
                    edges {
                    node {
                        id
                        name
                        role
                    }
                    }
                }
            }';

        $response = $api->graph($query);
        $data = json_decode(json_encode($response), true);
        $id = $data['body']['data']['themes']['edges'][0]['node']['id'];
        $query = 'query ($themeId: ID!, $fileNames: [String!], $fileLimit: Int) {
                theme(id: $themeId) {
                    id
                    name
                    role
                    files(filenames: $fileNames, first: $fileLimit) {
                    nodes {
                        body {
                        ... on OnlineStoreThemeFileBodyText {
                            content
                        }
                        }
                    }
                    }
                }
                }';
        $variables = [
            'themeId' => $id,
            'fileNames' => ["config/settings_data.json"],
            'fileLimit' => 1
        ];

        $response = $api->graph($query, $variables);
        $data = json_decode(json_encode($response), true);
        $html = '[]';
        if (isset($data['body']['data']['theme']['files']['nodes'][0]['body']['content'])) {
            $html = $data['body']['data']['theme']['files']['nodes'][0]['body']['content'];
        }
        $json_string = preg_replace('/\/\*.*?\*\//s', '', $html);
        $json_array = json_decode($json_string, true);
        $current = isset($json_array['current']) ? $json_array['current'] : [];
        // $type = 'shopify://apps/coupon-code/blocks/star_rating/9aed28e4-1a34-4285-9bc4-27b84405ea37';
        $type = 'shopify://apps/toro-sales-notifications/blocks/star_rating/32e5af68-81eb-458b-a832-3995584cb12e';
        $appStatus = false;
        if (isset($current['blocks'])) {
            foreach ($current['blocks'] as $block) {
                if ($type == $block['type']) {
                    $appStatus = $block['disabled'];
                }
            }
        }
        return response()->json(['appStatus' => $appStatus]);
    }
}
