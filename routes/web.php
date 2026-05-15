<?php

use App\Http\Controllers\PlanController;
use App\Http\Controllers\FrontEndControllr;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', [FrontEndControllr::class, 'index'])->middleware('verify.shopify')->name('home');


Route::post('/webhook/customers-data-request',function(){
    return response('Ok',200);
});
Route::post('/webhook/customers-redact',function(){
    return response('Ok',200);
});
Route::post('/webhook/shop-redact',function(){
    return response('Ok',200);
});
Route::post('/webhook/app-subscriptions-update', [PlanController::class, 'subscriptionWebhook']);

Route::fallback([FrontEndControllr::class, 'index']);
