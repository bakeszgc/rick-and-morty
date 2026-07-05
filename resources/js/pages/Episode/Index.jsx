import Episode from "./Episode.jsx";

export default function Index({ episodes }){
    return (
        <div className="bg-slate-50 py-8">
            <h1 className="text-center text-2xl font-bold mb-8">Rick & Morty episodes</h1>
            <section className="rounded-2xl max-w-4xl mx-auto mb-8 shadow-xl overflow-hidden">
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
                        {episodes.map(ep => <Episode episode={ep} key={ep.episode} />)}
                    </tbody>
                </table>
            </section>
        </div>
    );
}