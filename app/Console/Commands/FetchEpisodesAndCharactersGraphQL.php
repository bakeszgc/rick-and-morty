<?php

namespace App\Console\Commands;

use App\Models\Episode;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use RuntimeException;
use Softonic\GraphQL\Client;
use Str;

#[Signature('app:fetch-episodes-and-characters-graphql')]
#[Description('Command description')]
class FetchEpisodesAndCharactersGraphQL extends Command
{
    public function __construct(
        private Client $client
    ) {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Fetching Rick & Morty episodes and characters...');

        $episodeCounter = 0;
        
        $query = <<<'QUERY'
            query GetEpisodes($page: Int) {
                episodes(page: $page){
                    info{
                        next,pages
                },
                results {
                    id, name, air_date, episode, characters {id, name}
                }
            }
        }
        QUERY;

        $page = 1;

        do {
            $variables = ['page' => $page];
            $response = $this->client->query($query,$variables);

            if ($response->hasErrors()) {
                throw new RuntimeException(
                    'GraphQL query failed: ' . json_encode($response->getErrors())
                );
            }

            $episodes = $response->getData()['episodes']['results'];
            $nextPage = $response->getData()['episodes']['info']['next'];

            foreach ($episodes as $episode) {
                Episode::storeEpisodeWithCharacters($episode,'graphql');
                $episodeCounter++;
            }

            $page++;
        } while ($nextPage !== null);

        $this->info("Episode and character data updated for {$episodeCounter} " . Str::plural('episode',$episodeCounter) . ".");
    }
}
