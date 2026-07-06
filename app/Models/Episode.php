<?php

namespace App\Models;

use Database\Factories\EpisodeFactory;
use Illuminate\Database\Eloquent\Attributes\UseFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[UseFactory(EpisodeFactory::class)]
class Episode extends Model
{
    use HasFactory;
    
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
