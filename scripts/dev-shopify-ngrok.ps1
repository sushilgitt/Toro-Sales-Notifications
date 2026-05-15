param(
    [string]$Store = "",
    [string]$Config = "dev",
    [string]$TunnelUrl = $env:SHOPIFY_TUNNEL_URL
)

if (-not $TunnelUrl) {
    try {
        $response = Invoke-RestMethod -Uri "http://127.0.0.1:4040/api/tunnels" -UseBasicParsing
        $TunnelUrl = $response.tunnels |
            Where-Object { $_.proto -eq "https" -and $_.public_url } |
            Select-Object -First 1 -ExpandProperty public_url
    } catch {
        Write-Error "Couldn't read the ngrok local API on http://127.0.0.1:4040. Start ngrok first, or set SHOPIFY_TUNNEL_URL."
        exit 1
    }
}

if (-not $TunnelUrl) {
    Write-Error "No HTTPS ngrok tunnel was found. Start ngrok first, or set SHOPIFY_TUNNEL_URL."
    exit 1
}

$uri = $null
try {
    $uri = [System.Uri]$TunnelUrl
} catch {
    Write-Error "Tunnel URL is not a valid URI: $TunnelUrl"
    exit 1
}

if ($uri.IsDefaultPort) {
    $defaultPort = if ($uri.Scheme -eq "https") { 443 } elseif ($uri.Scheme -eq "http") { 80 } else { $null }
    if ($defaultPort) {
        $TunnelUrl = "{0}://{1}:{2}" -f $uri.Scheme, $uri.Host, $defaultPort
    }
}

Write-Host "Using ngrok tunnel: $TunnelUrl"

$arguments = @("app", "dev", "--config", $Config, "--tunnel-url", $TunnelUrl)

if ($Store) {
    $arguments += @("--store", $Store)
}

& shopify.cmd @arguments
