# Telepítés

Az app ezen a Github repo-n érhető el és az alábbi parancsok futtatását követően lesz indulásra kész. A php artisan migrate futtatása előtt konfigurálni kell az adatbázis kapcsolatot a .env fájlban. Az alkalmazás MySQL-lel és SQLite-tal is működik.

```bash
git clone https://github.com/bakeszgc/rick-and-morty.git
cd rick-and-morty
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan app:fetch-episodes-and-characters-graphql
composer run dev
```

# Az app működése

Az alkalmazás a Rick & Morty public API-jából lekéri az epizódokat és a bennük szereplő karaktereket, majd az adatokat saját adatbázisban tárolja és React alapú felületen jeleníti meg.

Az alkalmazás két különböző adatlekérési módot is tartalmaz.

REST:
```bash
php artisan app:fetch-episodes-and-characters
```

GraphQL:
```bash
php artisan app:fetch-episodes-and-characters-graphql
```

A frontend React segítségével készült, a root URL-en található (jellemzően localhost:8000) az epizódokat megjelenítő táblázat. Ez lapozható az oldal alján található gombok segítségével. Az egyes részre kattintva lenyílik egy ablak, amely az adott epizódban szereplő karaktereket tartalmazza.

A fenti input mezők segítségével szűrhetjük a táblázat tartalmát az epizód neve és az első adás dátuma alapján, illetve sorba is rendezhetjük őket a megjelenített adatok alapján a fejlécekre kattintva.

# Tesztelés

A projekt mind a REST API-t, mind a GraphQL-alapú adatlekérést külön feature tesztekkel ellenőrzi. A tesztek többek között az alábbiakat vizsgálják:
- az Artisan parancsok sikeres lefutását
- az epizódok és karakterek adatbázisba mentését
- a many-to-many kapcsolatok helyes létrehozását
- az import ismételt futtatásakor a duplikációk elkerülését

Ezek futtathatók az alábbi parancs segítségével:
```bash
php artisan test tests/Feature/FetchEpisodesAndCharactersTest.php
```

# Felhasznált technológiák

- Laravel 12
- React
- Inertia.js
- Tailwind CSS
- MySQL / SQLite
- Rick & Morty REST API
- Rick & Morty GraphQL API
- Softonic GraphQL Client
- Pest