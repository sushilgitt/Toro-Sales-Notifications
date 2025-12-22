<?php

namespace App\Console\Commands;

use App\Helper\MetafieldHelper;
use App\Models\User;
use App\Models\Shipping as ShippingModel;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Shipping extends Command
{
    protected $signature = 'app:shipping';
    protected $description = 'Update shipping status based on start and end dates';

    public function handle()
    {
        $today = Carbon::today();

        $shippings = ShippingModel::all();
        info('shippings');

        $helper = new MetafieldHelper();

        foreach ($shippings as $shipping) {
            $details = json_decode($shipping->details, true);
            $status = (bool) Carbon::today()->between(Carbon::parse($details['startdate']), Carbon::parse($details['enddate']));


            if ($shipping->shipping != $status) {
                $shipping->update(['shipping' => $status]);
            }

            if ($shipping->deliverycustomizationid) {
                $user = User::where('name', $shipping->shop)->first();
                if ($user) {
                    $metafieldData = [
                        'shipping' => $status,
                        'shippingamount' => $details['shippingamount'] ?? 0,
                        'startdate' => $details['startdate'],
                        'enddate' => $details['enddate'],
                    ];


                    $result = $helper->updateDeliveryCustomization(
                        $user,
                        $shipping->deliverycustomizationid,
                        $metafieldData,
                        $shipping
                    );
                }
            }
        }


        $this->info('✅ Shipping status and metafields updated successfully.');
    }
}
