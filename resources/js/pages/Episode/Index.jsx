import { useState } from "react";
import Episode from "./Episode.jsx";
import TableHead from "./TableHead.jsx";
import PaginationButton from "./PaginationButton.jsx";
import EpisodesTable from "./EpisodesTable.jsx";

const SORT_BY_INIT = {
    attrName: 'episode',
    direction: 'asc'
};

export default function Index({ episodes }){
    const [search,setSearch] = useState('');
    const [afterDate,setAfterDate] = useState('');
    const [beforeDate,setBeforeDate] = useState('');
    const [sortBy, setSortBy] = useState(SORT_BY_INIT);

    // Filtering logic
    if (search !== '') {
        episodes = episodes.filter((episode) => episode.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (afterDate !== '') {
        episodes = episodes.filter((episode) => episode.air_date >= afterDate);
    }

    if (beforeDate !== '') {
        episodes = episodes.filter((episode) => episode.air_date <= beforeDate);
    }

    // Sorting logic
    const sortedEpisodes = [...episodes].sort((a,b) => {
        let result = a[sortBy.attrName].localeCompare(b[sortBy.attrName]);
        return sortBy.direction === 'desc' ? -result : result;
    });    

    // Handler functions
    function handleSearchChange(e) {
        setSearch(e.target.value);
    }

    function handleSearchResetClick() {
        setSearch('');
    }

    function handleAfterDateChange(e) {
        setAfterDate(e.target.value);
    }

    function handleBeforeDateChange(e) {
        setBeforeDate(e.target.value);
    }

    function handleSortClick(attrName){
        if (attrName === sortBy.attrName) {
            const newDir = sortBy.direction === 'asc' ? 'desc' : 'asc';
            setSortBy({
                attrName: attrName,
                direction: newDir
            });
        } else {
            setSortBy({
                attrName: attrName,
                direction: 'asc'
            });
        }
    }

    return (
        <div className="py-8 px-2">
            <h1 className="text-center text-2xl font-bold mb-8">Rick & Morty episodes</h1>

            <section className="max-w-4xl mx-auto mb-8">
                <div className="flex flex-col mb-4">
                    <label htmlFor="search">Search for a title</label>
                    <div className="relative">
                        <input type="text" id="search" className="w-full bg-white border border-green-300 hover:border-green-500 transition-all rounded-2xl px-4 py-2" value={search} onChange={handleSearchChange} />
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="absolute right-4 top-2 text-slate-500 hover:text-black transition-all cursor-pointer" onClick={handleSearchResetClick}><path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="m12 9 6 6"/><path d="m18 9-6 6"/></svg>
                    </div>
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

            <EpisodesTable handleSortClick={handleSortClick} sortBy={sortBy} sortedEpisodes={sortedEpisodes} />
        </div>
    );
}