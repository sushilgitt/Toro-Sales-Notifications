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
                const host = @json(request()->query('host', request()->input('host', '')));
                const apiKey = document.querySelector('meta[name="shopify-api-key"]')?.content;

                if (window.top === window.self) {
                    window.location.assign(redirectUrl);
                    return;
                }

                if (window.shopify?.open) {
                    window.shopify.open(redirectUrl, '_top');
                    return;
                }

                const AppBridge = window['app-bridge'];
                const createApp = AppBridge?.default;
                const Redirect = AppBridge?.actions?.Redirect;

                if (createApp && Redirect && host && apiKey) {
                    const app = createApp({
                        apiKey,
                        host,
                        forceRedirect: true,
                    });

                    Redirect.create(app).dispatch(Redirect.Action.REMOTE, redirectUrl);
                    return;
                }

                window.location.assign(redirectUrl);
            });
        </script>
    </head>
    <body>
    </body>
</html>
