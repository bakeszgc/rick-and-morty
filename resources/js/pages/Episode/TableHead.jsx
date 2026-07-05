export default function TableHead({handleSortClick, attrName, sortBy, children}) {
    let sortArrow = '';

    if (sortBy.attrName === attrName) {
        sortArrow = sortBy.direction === 'asc' ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M11 12h4"/><path d="M11 16h7"/><path d="M11 20h10"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M11 4h10"/><path d="M11 8h7"/><path d="M11 12h4"/></svg>;
    }
    return (
        <div className="flex items-center gap-2">
            <span className="hover:underline cursor-pointer transition-all" onClick={() => handleSortClick(attrName)}>
                {children}
            </span>
            {sortArrow ? <span>{sortArrow}</span> : ''}
        </div>
        
    );
}