<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    protected $fillable = [
        'external_id',
        'name',
        'air_date',
        'episode'
    ];

    public function characters()
    {
        return $this->belongsToMany(Character::class);
    }
}
