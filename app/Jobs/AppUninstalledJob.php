<?php namespace App\Jobs;

use App\Models\Banner;
use App\Models\Customize;
use App\Models\Display;
use App\Models\MainSetting;
use App\Models\Shipping;
use App\Models\Triggers;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Osiset\ShopifyApp\Objects\Values\ShopDomain;
use stdClass;
use Exception;

class AppUninstalledJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Shop's myshopify domain
     *
     * @var ShopDomain|string
     */
    public $shopDomain;

    /**
     * The webhook data
     *
     * @var object
     */
    public $data;

    /**
     * Create a new job instance.
     *
     * @param string   $shopDomain The shop's myshopify domain.
     * @param stdClass $data       The webhook data (JSON decoded).
     *
     * @return void
     */
    public function __construct($shopDomain, $data)
    {
        $this->shopDomain = $shopDomain;
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        

         try {
            $user = User::where('name', $this->shopDomain)->first();

            if ($user) {
                Banner::where('shop', $user->name)->delete();
                Customize::where('shop', $user->name)->delete();
                Display::where('shop', $user->name)->delete();
                MainSetting::where('shop', $user->name)->delete();
                Triggers::where('shop', $user->name)->delete();
                Shipping::where('shop',$user->name)->delete();
                $user->delete();

            } else {
                info("No user found for domain: {$this->shopDomain}");
            }
        } catch (Exception $e) {
            info("Error processing AppUninstalled webhook: {$e->getMessage()}");
            throw $e; // Re-throw the exception to allow queue to handle retries
        }
    }
}
