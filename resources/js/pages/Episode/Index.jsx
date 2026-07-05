import { useState } from "react";
import Episode from "./Episode.jsx";

export default function Index({ episodes }){
    const [search,setSearch] = useState('');
    const [afterDate,setAfterDate] = useState('');
    const [beforeDate,setBeforeDate] = useState('');

    if (search !== '') {
        episodes = episodes.filter((episode) => episode.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (afterDate !== '') {
        episodes = episodes.filter((episode) => episode.air_date >= afterDate);
    }

    if (beforeDate !== '') {
        episodes = episodes.filter((episode) => episode.air_date <= beforeDate);
    }

    function handleSearchChange(e) {
        setSearch(e.target.value);
    }

    function handleAfterDateChange(e) {
        setAfterDate(e.target.value);
    }

    function handleBeforeDateChange(e) {
        setBeforeDate(e.target.value);
    }

    return (
        <div className="py-8 px-2">
            <h1 className="text-center text-2xl font-bold mb-8">Rick & Morty episodes</h1>

            <section className="max-w-4xl mx-auto mb-8">
                <div className="flex flex-col mb-4">
                    <label htmlFor="search">Search for a title</label>
                    <input type="text" id="search" className="w-full bg-white border border-green-300 hover:border-green-500 transition-all rounded-2xl px-4 py-2" value={search} onChange={handleSearchChange} />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                        <label htmlFor="afterDate">Air date after</label>
                        <input type="date" id="afterDate" className="w-full bg-white border border-green-300 hover:border-green-500 transition-all rounded-2xl px-4 py-2" onChange={handleAfterDateChange} />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="beforeDate">Air date before</label>
                        <input type="date" id="beforeDate" className="w-full bg-white border border-green-300 hover:border-green-500 transition-all rounded-2xl px-4 py-2" onChange={handleBeforeDateChange} />
                    </div>
                </div>
            </section>

            <section className="rounded-2xl max-w-4xl mx-auto shadow-xl overflow-hidden">
                <table className="bg-white w-full *:*:*:p-4">
                    <thead className="bg-green-500 font-bold">
                        <tr>
                            <td>Episode</td>
                            <td>Title</td>
                            <td>Air date</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {episodes.length > 0 ? episodes.map(ep => <Episode episode={ep} key={ep.episode} />) : <tr >
                            <td colSpan="4">
                                There aren't any episodes matching to your searching criterias.
                            </td>
                        </tr>}
                    </tbody>
                </table>
            </section>
        </div>
    );
}