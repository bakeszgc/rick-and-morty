import Episode from "./Episode";
import PaginationButton from "./PaginationButton";
import TableHead from "./TableHead";
import { useState } from "react";

const EPISODES_PER_PAGE = 10;

export default function EpisodesTable({handleSortClick, sortBy, sortedEpisodes}) {
    const [currentPage, setCurrentPage] = useState(1);

    // Pagination logic
    const totalPages = Math.ceil(sortedEpisodes.length / EPISODES_PER_PAGE);
    if (currentPage > totalPages) {
        setCurrentPage(totalPages);
    }

    const sliceStart = (currentPage - 1) * EPISODES_PER_PAGE;
    const slicedEpisodes = [...sortedEpisodes].slice(sliceStart, sliceStart + EPISODES_PER_PAGE);

    function handlePaginationButtonClick(changeValue) {
        setCurrentPage(currentPage + changeValue);
    }

    return (
        <section className="max-w-4xl mx-auto">
            <div className="rounded-2xl shadow-xl overflow-hidden mb-4">
                <table className="bg-white w-full *:*:*:p-4">
                    <thead className="bg-green-500 font-bold">
                        <tr>
                            <td className="w-[15%]">
                                <TableHead attrName="episode" sortBy={sortBy} handleSortClick={handleSortClick}>Episode</TableHead>
                            </td>
                            <td>
                                <TableHead attrName="name" sortBy={sortBy} handleSortClick={handleSortClick}>Title</TableHead>
                            </td>
                            <td className="w-[15%]">
                                <TableHead attrName="air_date" sortBy={sortBy} handleSortClick={handleSortClick}>Air date</TableHead>
                            </td>
                            <td className="w-[5%]"></td>
                        </tr>
                    </thead>
                    <tbody>
                        {slicedEpisodes.length > 0 ? slicedEpisodes.map(ep => <Episode episode={ep} key={ep.episode} />) : <tr >
                            <td colSpan="4">
                                There aren't any episodes matching to your searching criterias.
                            </td>
                        </tr>}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-end gap-2">
                <PaginationButton direction="prev" currentPage={currentPage} totalPages={totalPages} handleClick={handlePaginationButtonClick} />
                <p>{currentPage + ' / ' + totalPages}</p>
                <PaginationButton direction="next" currentPage={currentPage} totalPages={totalPages} handleClick={handlePaginationButtonClick} />
            </div>
        </section>
    );
}