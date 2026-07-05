export default function Character({character}) {
    return (
        <div className="rounded-xl overflow-hidden relative group">
            <img src={'https://rickandmortyapi.com/api/character/avatar/' + character.external_id + '.jpeg'} alt={character.name} loading="lazy" className=" group-hover:scale-105 transition-all" />
            
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-b from-transparent to-black flex items-end group-hover:translate-y-1/2 transition-all">
                <p className="p-2 font-bold text-white">{character.name}</p>
            </div>
        </div>
    )
}