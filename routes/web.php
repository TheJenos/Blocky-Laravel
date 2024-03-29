<?php

use App\Http\Controllers\BlocklyController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/blocky', [BlocklyController::class, 'index']);
Route::post('/blocky/json', [BlocklyController::class, 'store']);
Route::get('/blocky/json', [BlocklyController::class, 'show']);
