<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laravel with React</title>
    <meta name="shopify-api-key" content="{{ config('shopify-app.api_key') }}" />
    <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>
    <script type="text/javascript">
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = "f2fbf04e-52f0-4818-83ec-ecd33dc5e388";
        (function () {
            var d = document;
            var s = d.createElement("script");
            s.src = "https://client.crisp.chat/l.js";
            s.async = 1;
            d.getElementsByTagName("head")[0].appendChild(s);
        })();
    </script>
    <script async src="https://cdn.heymantle.com/mantle_apptrack.js?appToken=ad3c672b137bc79acc8627125893ee96"></script>
</head>

<body>
    <div id="app"></div>
    
    @viteReactRefresh
    @vite('resources/react/app.jsx')
</body>

</html>