<?php

namespace App\Models;

use Database\Factories\CharacterFactory;
use Illuminate\Database\Eloquent\Attributes\UseFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[UseFactory(CharacterFactory::class)]
class Character extends Model
{
    use HasFactory;
    protected $fillable = [
        'external_id',
        'name'
    ];

    public function episodes()
    {
        return $this->belongsToMany(Episode::class);
    }
}
