<?php

use App\Models\Character;
use App\Models\Episode;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('character_episode', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Character::class)->constrained();
            $table->foreignIdFor(Episode::class)->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('character_episode');
    }
};
