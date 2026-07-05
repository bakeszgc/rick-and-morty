export default function Index({ episodes }){
    return (
        <>
            <p>Hello</p>
            {episodes.map(episode => <p>{episode.episode}</p>)}
        </>
    );
}