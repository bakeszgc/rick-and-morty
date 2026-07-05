import { useState } from "react";
import Character from "./Character";

export default function Episode({episode}) {
    const [showCharacters,setShowCharacters] = useState(false);

    function handleClick(){
        setShowCharacters(!showCharacters);
    }

    return (
        <>
            <tr onClick={handleClick} className="cursor-pointer hover:bg-green-100 transition-all">
                <td>{episode.episode}</td>
                <td>{episode.name}</td>
                <td>{episode.air_date}</td>
                <td>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={'transition-all ' + (showCharacters && 'rotate-180')}><path d="m7 6 5 5 5-5"/><path d="m7 13 5 5 5-5"/></svg>
                </td>
            </tr>
            <tr className={!showCharacters ? 'hidden' : ''}>
                <td colSpan="4">
                    <h2 className="text-xl mb-4">Characters appearing in {episode.episode}</h2>
                    <div className="w-full grid grid-cols-4 gap-4">
                        {episode.characters.map(char => (
                            <Character key={episode.episode + '_' + char.external_id} character={char} />
                        ))}
                    </div>
                </td>
            </tr>
        </>
    );
}