import { useState } from "react";
import Episode from "./Episode.jsx";
import TableHead from "./TableHead.jsx";
import PaginationButton from "./PaginationButton.jsx";
import EpisodesTable from "./EpisodesTable.jsx";
import EpisodesFilters from "./EpisodesFilters.jsx";

const SORT_BY_INIT = {
    attrName: 'episode',
    direction: 'asc'
};

const FILTER_BY_INIT = {
    search: '',
    afterDate: '',
    beforeDate: '',
}

export default function Index({ episodes }){
    const [filterBy, setFilterBy] = useState(FILTER_BY_INIT);
    const [sortBy, setSortBy] = useState(SORT_BY_INIT);

    // Filtering logic
    if (filterBy.search !== '') {
        episodes = episodes.filter((episode) => episode.name.toLowerCase().includes(filterBy.search.toLowerCase()));
    }

    if (filterBy.afterDate !== '') {
        episodes = episodes.filter((episode) => episode.air_date >= filterBy.afterDate);
    }

    if (filterBy.beforeDate !== '') {
        episodes = episodes.filter((episode) => episode.air_date <= filterBy.beforeDate);
    }

    // Sorting logic
    const sortedEpisodes = [...episodes].sort((a,b) => {
        let result = a[sortBy.attrName].localeCompare(b[sortBy.attrName]);
        return sortBy.direction === 'desc' ? -result : result;
    });    

    // Handler functions
    function handleFilterChange(e) {
        setFilterBy({
            ...filterBy,
            [e.target.id]: e.target.value
        });
    }

    function handleSearchResetClick() {
        setFilterBy({
            ...filterBy,
            search: ''
        });
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

            <EpisodesFilters filterBy={filterBy} handleFilterChange={handleFilterChange} handleSearchResetClick={handleSearchResetClick} />

            <EpisodesTable handleSortClick={handleSortClick} sortBy={sortBy} sortedEpisodes={sortedEpisodes} />
        </div>
    );
}