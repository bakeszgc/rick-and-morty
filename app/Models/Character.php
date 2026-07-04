<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    protected $fillable = [
        'external_id',
        'name'
    ];

    public function episodes()
    {
        return $this->belongsToMany(Episode::class);
    }
}
