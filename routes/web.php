<?php

use App\Http\Controllers\EpisodeController;
use Illuminate\Support\Facades\Route;

//Route::inertia('/', 'welcome')->name('home');
Route::get('/',[EpisodeController::class,'index'])->name('episodes.index');
