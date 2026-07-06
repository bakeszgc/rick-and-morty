<?php

use App\Models\Character;
use App\Models\Episode;
use Illuminate\Support\Facades\Http;

// test('example', function () {
//     $response = $this->get('/');

//     $response->assertStatus(200);
// });

test('creates episodes and characters with correct pivot relationships', function () {
    // Creating a fake response instead of using the API
    Http::fake([
        'rickandmortyapi.com/api/episode' => Http::response([
            'info' => ['next' => null],
            'results' => [
                [
                    'id' => 1,
                    'name' => 'Pilot',
                    'air_date' => 'December 2, 2013',
                    'episode' => 'S01E01',
                    'characters' => [
                        'https://rickandmortyapi.com/api/character/1',
                        'https://rickandmortyapi.com/api/character/2',
                    ],
                ],
            ],
        ]),
        'rickandmortyapi.com/api/character/1,2' => Http::response([
            ['id' => 1, 'name' => 'Rick Sanchez'],
            ['id' => 2, 'name' => 'Morty Smith'],
        ]),
    ]);

    $this->artisan('app:fetch-episodes-and-characters');

    // Testing for the number of episodes and characters saved in the database
    expect(Episode::count())->toBe(1);
    expect(Character::count())->toBe(2);

    // Testing for the many-to-many relationship between the Episode and the Character model
    $firstEpisode = Episode::where('external_id', 1)->first();
    expect($firstEpisode->characters)->toHaveCount(2);
    expect($firstEpisode->characters->pluck('name'))->toContain('Rick Sanchez', 'Morty Smith');
});

test('updates existing episodes instead of creating duplicates on re-execution', function() {
    // Creating a fake response instead of using the API
    Http::fake([
        'rickandmortyapi.com/api/episode' => Http::response([
            'info' => ['next' => null],
            'results' => [[
                'id' => 1, 'name' => 'Pilot', 'air_date' => 'December 2, 2013',
                'episode' => 'S01E01',
                'characters' => [
                    'https://rickandmortyapi.com/api/character/1',
                    'https://rickandmortyapi.com/api/character/2',
                ],
            ]],
        ]),
        'rickandmortyapi.com/api/character/1,2' => Http::response([
            ['id' => 1, 'name' => 'Rick Sanchez'],
            ['id' => 2, 'name' => 'Morty Smith'],
        ]),
    ]);

    // Run the command twice
    $this->artisan('app:fetch-episodes-and-characters');
    $this->artisan('app:fetch-episodes-and-characters');

    // Test for the number of episodes stored in database
    expect(Episode::count())->toBe(1);
});

test('can attach and retrieve characters on an episode', function() {
    $episode = Episode::factory()->create();
    $characters = Character::factory()->count(3)->create();

    $episode->characters()->attach($characters);

    expect($episode->characters)->toHaveCount(3);

});