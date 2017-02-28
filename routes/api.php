<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:api');

Route::get('/grid/{height}/{width}/random', 'GridController@random');
Route::get('/grid/{height}/{width}/roads', 'GridController@roads');

Route::post('/path/find', 'PathController@find');

Route::post('/image', 'ImageController@save');