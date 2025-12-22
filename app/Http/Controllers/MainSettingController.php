<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Customize;
use App\Models\Display;
use App\Models\MainSetting;
use Shopify\Auth\Session as AuthSession;
use App\Models\Session;
use App\Models\Shipping;
use App\Models\Triggers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Shopify\Clients\Rest;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\Support\MediaStream;
use Illuminate\Support\Facades\Validator;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Messaging\CloudMessage;
use Illuminate\Support\Str;
use Kreait\Firebase\Exception\MessagingException;
use Exception;


class MainSettingController extends Controller
{

   

    public function coupon_data(Request $request)
    {
        
        $shop = $request->shop;
        info($shop);
          info('shipping data');
        $mainSettings = MainSetting::active()
            ->where('shop', $shop)
            ->with('displays', 'customizes', 'triggers')
            ->get();

        $countdown = Banner::where('shop', $shop)->get();
        $shippingbanner = Shipping::where('shop',$shop)->get();
        info($shippingbanner->toArray());

        return response()->json([
            'mainSettings' => $mainSettings,
            'countdown' => $countdown,
            'shippingbanner' => $shippingbanner,
        ]);
    }

    public function status(Request $request)
    {
        $status = MainSetting::find($request->id);
        $status->update([
            'id' => $request->id,
            'status' => $request->enabled,
        ]);
        return response()->json(['message' => 'Status updated successfully']);
    }

    public function store_settings(Request $request)
    {

        /** @var AuthSession */
        $userId = Auth::id();
        $user = User::find($userId)->name;

        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'nullable|string',
            'file' => 'nullable',
            'subdescription' => 'nullable|string',
            'altText' => 'nullable|string',
            'couponCode' => 'nullable|string',
            'buttonText' => 'nullable|string',
            'ButtonURL' => 'nullable|string',
            'triggerDirection' => 'nullable|string',
            'triggerType' => 'nullable|string',
            'checkedClose' => 'required',
            'checkedBrand' => 'nullable',
            'value' => 'nullable|integer',
            'selectedpage' => [
                'nullable',
                'required_if:checkedAllpage,false',
                'string',
            ],
            'fullUrl' => [
                'nullable',
                'required_if:checkedAllpage,false', 
                'string',
            ],
            'cssSelector' => 'nullable|string',
            'displayFrequency' => 'required|string',
            'TitleColor' => 'nullable|string',
            'DecriptionColor' => 'nullable|string',
            'BackgroundColor' => 'nullable|string',
            'ButtonColor' => 'nullable|string',
            'BorderColor' => 'nullable|string',
            'ButtonTextColor' => 'nullable|string',
            'rangeValuePadding' => 'nullable|integer',
            'borderRadius' => 'nullable|string',
            'rangeValueWidth' => 'nullable|integer',
            'selectedBackgroundImage' => 'nullable|string',
            'CloseButtonTextColor' => 'nullable|string',
            'checkedshedow' => 'nullable',
            'selectedhover' => 'nullable|string',
            'selectedentrance' => 'nullable|string',
            'selectedexit' => 'nullable|string',
            'selectedanimation' => 'nullable|string',
            'weight' => 'nullable|integer',
            'displayRadio' => 'nullable|string',
            'titleFontSize' => 'nullable|string',
            'decriptionFontSize' => 'nullable|string',
            'CouponColor' => 'nullable|string',
            'CouponBgColor' => 'nullable|string',
            'CouponBorderColor' => 'nullable|string',
            'CouponBorderSize' => 'nullable|string',
            'CouponBorderStyle' => 'nullable|string',
            'verticalLine' => 'nullable|string',
            'copyButtonColor' => 'nullable|string',
            'copyButtonbgColor' => 'nullable|string',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        DB::beginTransaction();

        try {

            $Main_setting = MainSetting::create([
                'id' => $request->id,
                'title' => $request->title,
                'description' => $request->description,
                'file' => $request->file,
                'subdescription' => $request->subdescription,
                'altText' => $request->altText,
                'couponCode' => $request->couponCode,
                'buttonText' => $request->buttonText,
                'checkedNewTab' => $request->checkedNewTab === 'true' ? true : false,
                'ButtonURL' => $request->ButtonURL,
                'shop' => $user,
            ]);

            
            if ($request->hasFile('file')) {
                $Main_setting->addMediaFromRequest('file')->toMediaCollection('coupancodemainimage');
            }
            self::store_displays($request, $Main_setting->id);
            self::store_triggers($request, $Main_setting->id);
            self::store_coustomize($request, $Main_setting->id);

            DB::commit();

            return response()->json(['message' => 'MainSetting created successfully']);
        } catch (Exception $e) {
            DB::rollBack();

            info('Error in store_settings: ' . $e->getMessage());

            return response()->json(['error' => 'Failed to create MainSetting'], 500);
        }
    }

    public function index_settings(Request $request)
    {

        /** @var AuthSession */
        // $session = $request->get('shopifySession');
        // $shop = $session->getShop();
        $userId = Auth::id();
        $user = User::find($userId)->name;
        $settings = MainSetting::where('shop', $user)->get();
        return response()->json($settings);
    }

    public function destroy_settings($id)
    {
        $mainsetting = MainSetting::findOrFail($id);
        $Display = Display::where('coupon_id', $id)->firstOrFail();
        $Triggers = Triggers::where('coupon_id', $id)->firstOrFail();
        $Customize = Customize::where('coupon_id', $id)->firstOrFail();


        // $Display = Display::findOrFail($id);
        // $Triggers = Triggers::findOrFail($id);
        // $Customize = Customize::findOrFail($id);

        $mainsetting->delete();
        $Display->delete();
        $Triggers->delete();
        $Customize->delete();
        return response()->json(['message' => 'delete successfully']);
    }

    public function update(Request $request, $id)
    {

        // $request->validate([
        //     'title' => 'required|string',
        //     'description' => 'nullable|string',
        //     'file' => 'nullable',
        //     'subdescription' => 'nullable|string',
        //     'altText' => 'nullable|string',
        //     'couponCode' => 'nullable|string',
        //     'buttonText' => 'nullable|string',
        //     'showModal' => 'nullable|boolean',
        //     'BackgroundColor' => 'nullable|string',
        //     'ButtonURL' => 'nullable|string',
        //     'ButtonColor' => 'nullable|string',
        //     'ButtonTextColor' => 'nullable|string',
        //     'CloseButtonTextColor' => 'nullable|string',
        //     'borderRadius' => 'nullable|string',
        //     'selectedBackgroundImage' => 'nullable|string',
        //     'checkedNewTab' => 'nullable',
        //     'checkedClose' => 'nullable',
        //     'checkedBrand' => 'nullable',
        //     'triggerType' => 'nullable|string',
        //     'triggerDirection' => 'nullable|string',
        //     'value' => 'nullable|integer',
        //     'checkedAllpage' => 'nullable',
        //     'selectedpage' => 'nullable|string',
        //     'fullUrl' => 'nullable|string',
        //     'cssSelector' => 'nullable|string',
        //     'displayFrequency' => 'nullable|string',
        //     'schedule' => 'nullable',
        //     'startDate' => 'nullable|date',
        //     'endDate' => 'nullable|date',
        //     'TitleColor' => 'nullable|string',
        //     'DecriptionColor' => 'nullable|string',
        //     'rangeValuePadding' => 'nullable|integer',
        //     'rangeValueWidth' => 'nullable|integer',
        //     'BorderColor' => 'nullable|string',
        //     'checkedshedow' => 'nullable',
        //     'selectedhover' => 'nullable|string',
        //     'selectedentrance' => 'nullable|string',
        //     'selectedexit' => 'nullable|string',
        //     'selectedanimation' => 'nullable|string',
        //     'weight' => 'nullable|integer',
        //     'displayRadio' => 'nullable|string',
        //     'titleFontSize'=>'nullable|string',
        //     'decriptionFontSize'=>'nullable|string',
        //     'CouponColor'=>'nullable|string',
        //     'CouponBgColor'=>'nullable|string',
        //     'CouponBorderColor'=>'nullable|string',
        //     'CouponBorderSize'=>'nullable|string',
        //     'CouponBorderStyle'=>'nullable|string',
        // ]);


        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'nullable|string',
            'file' => 'nullable',
            'subdescription' => 'nullable|string',
            'altText' => 'nullable|string',
            'couponCode' => 'nullable|string',
            'buttonText' => 'nullable|string',
            'ButtonURL' => 'nullable|string',
            'triggerDirection' => 'nullable|string',
            'triggerType' => 'nullable|string',
            'checkedClose' => 'required',
            'checkedBrand' => 'nullable',
            'value' => 'nullable|integer',
            'selectedpage' => [
                'nullable',
                'required_if:checkedAllpage,false',
                'string',
            ],
            'fullUrl' => [
                'nullable',
                'required_if:checkedAllpage,false',
                'string',
            ],
            'cssSelector' => 'nullable|string',
            'displayFrequency' => 'required|string',
            'TitleColor' => 'nullable|string',
            'DecriptionColor' => 'nullable|string',
            'BackgroundColor' => 'nullable|string',
            'ButtonColor' => 'nullable|string',
            'BorderColor' => 'nullable|string',
            'ButtonTextColor' => 'nullable|string',
            'rangeValuePadding' => 'nullable|integer',
            'borderRadius' => 'nullable|string',
            'rangeValueWidth' => 'nullable|integer',
            'selectedBackgroundImage' => 'nullable|string',
            'CloseButtonTextColor' => 'nullable|string',
            'checkedshedow' => 'nullable',
            'selectedhover' => 'nullable|string',
            'selectedentrance' => 'nullable|string',
            'selectedexit' => 'nullable|string',
            'selectedanimation' => 'nullable|string',
            'weight' => 'nullable|integer',
            'displayRadio' => 'nullable|string',
            'titleFontSize' => 'nullable|string',
            'decriptionFontSize' => 'nullable|string',
            'CouponColor' => 'nullable|string',
            'CouponBgColor' => 'nullable|string',
            'CouponBorderColor' => 'nullable|string',
            'CouponBorderSize' => 'nullable|string',
            'CouponBorderStyle' => 'nullable|string',
            'verticalLine' => 'nullable|string',
            'copyButtonColor' => 'nullable|string',
            'copyButtonbgColor' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $mainSetting = MainSetting::findOrFail($id);

        $mainSetting->update([
            'id' => $request->id,
            'title' => $request->title,
            'description' => $request->description,
            'file' => $request->file,
            'subdescription' => $request->subdescription,
            'altText' => $request->altText,
            'couponCode' => $request->couponCode,
            'buttonText' => $request->buttonText,
            'checkedNewTab' => ($request->checkedNewTab === 'true' || $request->checkedNewTab === '1') ? true : false,
            'ButtonURL' => $request->ButtonURL,
        ]);


        // $mainSetting->update($request->all());

        if ($request->hasFile('file')) {
            info("File detected, processing...");
            $mainSetting->clearMediaCollection('coupancodemainimage');
            $mainSetting->addMediaFromRequest('file')->toMediaCollection('coupancodemainimage');
        } else {
            // info("No file detected");
        }

        Display::where('coupon_id', $id)->update([
            'triggerDirection' => $request->triggerDirection,
            'triggerType' => $request->triggerType,
            'checkedClose' => ($request->checkedClose === 'true' || $request->checkedClose === '1') ? true : false,
            'checkedBrand' => ($request->checkedBrand === 'true' || $request->checkedBrand === '1') ? true : false,
            'value' => $request->value,
        ]);

        Triggers::where('coupon_id', $id)->update([
            'checkedAllpage' => ($request->checkedAllpage === 'true' || $request->checkedAllpage === '1') ? true : false,
            'fullUrl' => $request->fullUrl,
            'cssSelector' => $request->cssSelector,
            'displayFrequency' => $request->displayFrequency,
            'displaytriggerType' => $request->displaytriggerType,
            'schedule' => ($request->schedule === 'true' || $request->schedule === '1') ? true : false,
            'startDate' => $request->startDate,
            'endDate' => $request->endDate,
            'selectedpage' => $request->selectedpage,
        ]);

        Customize::where('coupon_id', $id)->update([
            'TitleColor' => $request->TitleColor,
            'DecriptionColor' => $request->DecriptionColor,
            'BackgroundColor' => $request->BackgroundColor,
            'ButtonColor' => $request->ButtonColor,
            'ButtonTextColor' => $request->ButtonTextColor,
            'borderRadius' => $request->borderRadius,
            'selectedBackgroundImage' => $request->selectedBackgroundImage,
            'CloseButtonTextColor' => $request->CloseButtonTextColor,
            'checkedshedow' => ($request->checkedshedow === 'true' || $request->checkedshedow === '1') ? true : false,
            'selectedhover' => $request->selectedhover,
            'selectedentrance' => $request->selectedentrance,
            'selectedexit' => $request->selectedexit,
            'selectedanimation' => $request->selectedanimation,
            'weight' => $request->weight,
            'displayRadio' => $request->displayRadio,
            'TitleFontSize' => $request->titleFontSize,
            'DecriptionFontSize' => $request->decriptionFontSize,
            'CouponColor' => $request->couponColor,
            'CouponBgColor' => $request->couponBgColor,
            'CouponBorderColor' => $request->couponBorderColor,
            'CouponBorderSize' => $request->couponBorderSize,
            'CouponBorderStyle' => $request->couponBorderStyle,
            'verticalLine' => $request->verticalLine,
            'copyButtonColor' => $request->copyButtonColor,
            'copyButtonbgColor' => $request->copyButtonbgColor,
            'verticalLine' => $request->verticalLine,
            'copyButtonColor' => $request->copyButtonColor,
            'copyButtonbgColor' => $request->copyButtonbgColor,
            'rangeValuePadding' => $request->rangeValuePadding,
            'rangeValueWidth' => $request->rangeValueWidth,
            'BorderColor' => $request->BorderColor,
        ]);

        return response()->json(['message' => 'MainSetting updated successfully']);
    }

    public function get_settings($id)
    {
        $mainSetting = MainSetting::find($id);
        $display = Display::where('coupon_id', $id)->firstOrFail();
        $triggers = Triggers::where('coupon_id', $id)->firstOrFail();
        $customize = Customize::where('coupon_id', $id)->firstOrFail();

        return response()->json([
            'mainSetting' => $mainSetting,
            'display' => $display,
            'triggers' => $triggers,
            'customize' => $customize,
        ]);
    }

    public static function store_displays(Request $request, $id)
    {

        /** @var AuthSession */

         $userId = Auth::id();
        $user = User::find($userId)->name;

        Display::create([
            'triggerDirection' => $request->triggerDirection,
            'triggerType' => $request->triggerType,
            'checkedClose' => $request->checkedClose === 'true' ? true : false,
            'checkedBrand' => $request->checkedBrand === 'true' ? true : false,
            'value' => $request->value,
            'shop' => $user,
            'coupon_id' => $id,
        ]);

        // Optionally, return a response or redirect
        return response()->json(['message' => 'Display created successfully']);
    }

    public function store_triggers(Request $request, $id)
    {
        /** @var AuthSession */
        
        $userId = Auth::id();
        $user = User::find($userId)->name;

        Triggers::create([
            'checkedAllpage' => $request->checkedAllpage === 'true' ? true : false,
            'fullUrl' => $request->input('checkedAllpage') ?  null : $request->fullUrl,
            'cssSelector' => $request->cssSelector,
            'displaytriggerType' => $request->displaytriggerType,
            'displayFrequency' => $request->displayFrequency,
            'schedule' => $request->schedule === 'true' ? true : false,
            'startDate' => $request->startDate,
            'endDate' => $request->endDate,
            'selectedpage' => $request->input('checkedAllpage') ? null : $request->selectedpage,
            'shop' => $user,
            'coupon_id' => $id,
        ]);

        return response()->json(['message' => 'Trigger created successfully']);
    }

    public function store_coustomize(Request $request, $id)
    {
        /** @var AuthSession */

        $userId = Auth::id();
        $user = User::find($userId)->name;

        Customize::create([
            'TitleColor' => $request->TitleColor,
            'DecriptionColor' => $request->DecriptionColor,
            'BackgroundColor' => $request->BackgroundColor,
            'ButtonColor' => $request->ButtonColor,
            'BorderColor' => $request->BorderColor,
            'ButtonTextColor' => $request->ButtonTextColor,
            'rangeValuePadding' => $request->rangeValuePadding,
            'borderRadius' => $request->borderRadius,
            'rangeValueWidth' => $request->rangeValueWidth,
            'selectedBackgroundImage' => $request->selectedBackgroundImage,
            'CloseButtonTextColor' => $request->CloseButtonTextColor,
            'checkedshedow' => $request->checkedshedow === 'true' ? true : false,
            'selectedhover' => $request->selectedhover,
            'selectedentrance' => $request->selectedentrance,
            'selectedexit' => $request->selectedexit,
            'selectedanimation' => $request->selectedanimation,
            'weight' => $request->weight,
            'displayRadio' => $request->displayRadio ?? false,
            'TitleFontSize' => $request->titleFontSize,
            'DecriptionFontSize' => $request->decriptionFontSize,
            'CouponColor' => $request->couponColor,
            'CouponBgColor' => $request->couponBgColor,
            'CouponBorderColor' => $request->couponBorderColor,
            'CouponBorderSize' => $request->couponBorderSize,
            'CouponBorderStyle' => $request->couponBorderStyle,
            'verticalLine' => $request->verticalLine,
            'copyButtonColor' => $request->copyButtonColor,
            'copyButtonbgColor' => $request->copyButtonbgColor,
            'shop' => $user,
            'coupon_id' => $id,
        ]);

        return response()->json(['message' => 'Customize settings created successfully']);
    }

    public function getdatacount(Request $request)
    {
        /** @var AuthSession */
        // $session = $request->get('shopifySession');
        // info("session" . $request->shop);
        // $shop = $session->getShop();
        // info("shop" . $shop);
        $userId = Auth::id();
        $user = User::find($userId)->name;
        $count = MainSetting::where('shop', $user)->count();
        $activecount = MainSetting::where('shop', $user)
            ->where('status', true)
            ->count();
        $notactivecount = MainSetting::where('shop', $user)
            ->where('status', false)
            ->count();

        return response()->json(['count' => $count, 'activecount' => $activecount, 'notactivecount' => $notactivecount]);
    }



    

}
