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
        $episodeCounter = 0;

        $this->info('Fetching Rick & Morty episodes and characters...');
        
        while ($url) {
            $response = Http::retry(3,200)->get($url)->json();
            $episodes = $response['results'];
            $info = $response['info'];

            foreach ($episodes as $episode) {
                Episode::storeEpisodeWithCharacters($episode);
                $episodeCounter++;
            }

            // Sets the url to the next page, null if there aren't any pages left
            $url = $info['next'];
        }

        $this->info("Episode and character data updated for {$episodeCounter} " . Str::plural('episode',$episodeCounter) . ".");

    }
}
