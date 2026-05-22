<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <base target="_top">
        <title>Redirecting...</title>

        <script type="text/javascript">
            document.addEventListener('DOMContentLoaded', function () {
                const redirectUrl = @json($url);

                if (window.top === window.self) {
                    window.location.assign(redirectUrl);
                    return;
                }

                if (window.shopify?.open) {
                    window.shopify.open(redirectUrl, '_top');
                    return;
                }

                try {
                    window.top.location.href = redirectUrl;
                    return;
                } catch (error) {
                    window.location.assign(redirectUrl);
                }
            });
        </script>
    </head>
    <body>
    </body>
</html>
