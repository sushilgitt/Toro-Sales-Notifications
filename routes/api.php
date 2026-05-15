<?php

use App\Http\Controllers\CountDownController;
use App\Http\Controllers\MainSettingController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\PromoController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\ThemeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/', function () {
    return "Hello API";
});

Route::get('/plan/success', [PlanController::class, 'planSuccess'])->name('plan-success');

Route::get('/settings',[MainSettingController::class, 'index_settings'])->name('index.settings')->middleware('verify.shopify');

Route::get('/settings/{id}',[MainSettingController::class, 'get_settings']);
    
Route::post('/update/{id}', [MainSettingController::class, 'update']);

Route::delete('/destroy/{id}',[MainSettingController::class, 'destroy_settings'])->name('destroy.settings');

Route::post('/settings',[MainSettingController::class, 'store_settings'])->name('store.settings')->middleware('verify.shopify');

Route::post('/coupon_data', [MainSettingController::class, 'coupon_data']);

Route::post('/status',[MainSettingController::class, 'status'])->name('status');

Route::get('/getdatacount',[MainSettingController::class,'getdatacount'])->name('getdatacount')->middleware('verify.shopify');

Route::post('/plan-select',[PlanController::class, 'planSelect'])->name('planselect')->middleware('shopify.auth');

Route::get('/shopify-plan', [PlanController::class, 'getShopifyPlan'])->middleware('shopify.auth');

Route::get('/plan/approve', [PlanController::class, 'approvePlan'])->name('plan.approve');

Route::get('/check-subscription', [PlanController::class, 'checkSubscription'])->name('plan.checkSubscription')->middleware('shopify.auth');

//banner
Route::post('/storebanner', [CountDownController::class, 'storebanner'])->middleware('verify.shopify');
Route::get('/getbanner',[CountDownController::class,'getbanner'])->middleware('verify.shopify');
Route::get('/getbannerid/{id}', [CountDownController::class, 'getbannerid'])->middleware('verify.shopify');
Route::delete('/deletebanner/{id}',[CountDownController::class,'deletebanner'])->middleware('verify.shopify');
Route::post('/updatebanner/{id}',[CountDownController::class,'updatebanner'])->middleware('verify.shopify');


//promo
Route::post('/closePromo', [PromoController::class, 'closePromo'])->middleware('verify.shopify');
Route::get('/getPromptdata', [PromoController::class, 'getPromptdata'])->middleware('verify.shopify');
Route::get('/getthemefile', [ThemeController::class, 'getThemeFile'])->middleware('verify.shopify');

//shipping bar
Route::post('/shipping', [ShippingController::class, 'store'])->middleware('verify.shopify');
Route::get('/shippingget',[ShippingController::class,'getdata'])->middleware('verify.shopify');
// Route::get('/shippingbanner/{id}',[ShippingController::class,'getById'])->middleware('verify.shopify');
Route::get('/shippingbanner',[ShippingController::class,'getById'])->middleware('verify.shopify');
Route::put('/shipping/{id}', [ShippingController::class, 'update'])->middleware('verify.shopify');
Route::delete('/shipping/{id}', [ShippingController::class, 'destroy'])->middleware('verify.shopify');
Route::get('/shop/currency', [ShippingController::class, 'getShopCurrency'])->middleware('verify.shopify');
