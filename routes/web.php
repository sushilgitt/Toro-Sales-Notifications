<?php

use App\Http\Controllers\FrontEndControllr;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

 Route::fallback([FrontEndControllr::class, 'index']);
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
