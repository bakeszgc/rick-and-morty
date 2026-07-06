<?php

namespace App\Console\Commands;

use App\Models\Episode;
use Carbon\Carbon;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Str;

#[Signature('app:fetch-episodes-and-characters')]
#[Description('Fetch Rick & Morty episodes and characters from the API and store them in the database')]
class FetchEpisodesAndCharacters extends Command
{
    /**
     * Execute the console command.
     */
    public function handle()
    {
        $url = 'https://rickandmortyapi.com/api/episode';
        $charUrl = 'https://rickandmortyapi.com/api/character/';
        $episodeCounter = 0;

        $this->info('Fetching Rick & Morty episodes and characters...');
        
        while ($url) {
            $response = Http::retry(3,200)->get($url)->json();
            $episodes = $response['results'];
            $info = $response['info'];

            foreach ($episodes as $episode) {
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

                // Iterates over the characters appearing in the given episode
                $characterIds = collect($episode['characters'])->map(fn ($url) => (int) Str::afterLast($url,'/'))->toArray();

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

                $episodeCounter++;
            }

            // Sets the url to the next page, null if there aren't any pages left
            $url = $info['next'];
        }

        $this->info("Episode and character data updated for {$episodeCounter} " . Str::plural('episode',$episodeCounter) . ".");

    }
}
