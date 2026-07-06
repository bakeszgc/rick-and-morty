<?php

namespace Database\Factories;

use App\Models\Episode;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Episode>
 */
class EpisodeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'external_id' => fake()->numberBetween(),
            'name' => fake()->sentence(3),
            'episode' => 'S' . fake()->numberBetween(0,99) . 'E' . fake()->numberBetween(0,99),
            'air_date' => fake()->date('Y-m-d')
        ];
    }
}
