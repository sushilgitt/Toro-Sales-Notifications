<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <base target="_top">
        <meta name="shopify-api-key" content="{{ \Osiset\ShopifyApp\Util::getShopifyConfig('api_key', $shopDomain ?? Auth::user()->name ) }}" />
        <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>

        <title>Redirecting...</title>

        <script type="text/javascript">
            document.addEventListener('DOMContentLoaded', function () {
                const redirectUrl = @json($url);

                if (window.top === window.self) {
                    window.location.assign(redirectUrl);
                    return;
                }

                open(redirectUrl, '_top');
            });
        </script>
    </head>
    <body>
    </body>
</html>
