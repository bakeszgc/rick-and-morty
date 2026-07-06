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
    $firstEpisode = Episode::firstWhere('external_id', 1);
    expect($firstEpisode->characters)->toHaveCount(2);
    expect($firstEpisode->characters->pluck('name'))->toContain('Rick Sanchez', 'Morty Smith');

    // Testing for the database has the exact episode record
    $this->assertDatabaseHas('episodes', [
        'external_id' => 1,
        'name' => 'Pilot',
        'episode' => 'S01E01',
    ]);

    // Testing for the database has the exact character record
    $this->assertDatabaseHas('characters', [
        'external_id' => 1,
        'name' => 'Rick Sanchez',
    ]);
});

test('does not create duplicate episodes when command is executed twice', function() {
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

    // Test for the number of episodes and characters stored in database
    expect(Episode::count())->toBe(1);
    expect(Character::count())->toBe(2);

    // Test for pivot table records have not duplicated
    $episode = Episode::firstWhere('external_id', 1);
    expect($episode->characters)->toHaveCount(2);
});

test('can attach and retrieve characters on an episode', function() {
    // Creating an episode and 3 characters
    $episode = Episode::factory()->create();
    $characters = Character::factory()->count(3)->create();
    $episode->characters()->attach($characters);

    // Test for correct relationship setup
    expect($episode->characters)->toHaveCount(3);

    // Test for retrieving the exact character records
    expect($episode->characters->pluck('id'))->toContain(...$characters->pluck('id'));
});