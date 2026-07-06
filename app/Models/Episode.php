<?php

namespace App\Models;

use Carbon\Carbon;
use Database\Factories\EpisodeFactory;
use Illuminate\Database\Eloquent\Attributes\UseFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;
use Str;

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

    public static function storeEpisodeWithCharacters($episode) {
        $charUrl = 'https://rickandmortyapi.com/api/character/';

        // Creates/updates the episodes in the database
        $currentEpisode = Episode::updateOrCreate(
            [
                'external_id' => $episode['id']
            ],
            [                    
                'name' => $episode['name'],
                'air_date' => Carbon::parse($episode['air_date']),
                'episode' => $episode['episode']
            ]
        );

        // Iterates over the characters appearing in the givenepisode
        $characterIds = collect($episode['characters'])->map(fn($url) => (int) Str::afterLast($url,'/'))->toArray();

        $characters = Http::retry(3,200)->get($charUrl . implode(',',$characterIds))->json();

        if (count($characters) > 0) {
            foreach ($characters as $character) {
                // Creates/updates the character and inserts relationship data in pivot table
                $currentEpisode->characters()->updateOrCreate(
                    [
                        'external_id' => $character['id']
                    ],
                    [
                        'name' => $character['name']
                    ]
                );
            }
        }
    }
}
