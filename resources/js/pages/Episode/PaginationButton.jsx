export default function PaginationButton({direction, currentPage, totalPages, handleClick}) {
    let disabled = false;
    if (currentPage <= 1 && direction === 'prev' || currentPage === totalPages && direction === 'next') {
        disabled = true;
    }
    
    return (
        <button disabled={disabled} className="p-2 bg-white rounded-2xl border border-green-300 hover:border-green-500 transition-all cursor-pointer disabled:border-slate-300 disabled:hover:border-slate-300 disabled:text-slate-300 disabled:cursor-auto" onClick={() => handleClick((direction === 'prev') ? -1 : 1)}>
            {direction === 'prev' ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>}
        </button>
    );
}