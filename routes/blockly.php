<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Http\Request;


Route::get('test1',function (Request $request){
  for ($count = 0; $count < 100; $count++) {
    print('123');
  }
});