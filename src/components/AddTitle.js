import React, { useState } from "react";

const SearchResult = ({ data, titleData, setTitleData }) => {
    return (
        <div
            className="flex m-2 text-white bg-red-500 rounded-xl w-60 h-60"
            onClick={() => setTitleData({ ...titleData, data: data })}
        >
            <div className="flex flex-1 flex-col m-0.5 rounded-xl p-2 bg-gray-600 overflow-ellipsis overflow-hidden">
                <h5 className="font-bold">{data.title}</h5>
                <p className="pb-1">{data.synopsis}</p>
            </div>
        </div>
    )
}

const AddForm = ({ titleData, setTitleData }) => {
    const sendData = (e) => {
        console.log(titleData)
        e.preventDefault();
        fetch(`${process.env.REACT_APP_APIURL}/aniapi/list/add`, {
            method: 'POST',
            body: JSON.stringify(titleData),
            headers: {
                'Authentication': localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => console.log(data))
    }

    return (
        <div>
            <div className="selected-anime">
                <img src={titleData.data.image_url} alt="anime title thumbnail" />
                <div>
                    <h2>{titleData.data.title}</h2>
                    <p>{titleData.data.synopsis}</p>
                </div>
            </div>
            <form className="" onSubmit={sendData}>
                <fieldset>
                    <label htmlFor="status">Status</label>
                    <select name="status" defaultValue="none" onChange={e => setTitleData({ ...titleData, status: e.target.value })}>
                        <option value="watching">Watching</option>
                        <option value="planning">Planning</option>
                        <option value="watched">Watched</option>
                        <option value="dropped">Dropped</option>
                        <option disabled={true} value="none">Select watch status</option>
                    </select>
                    <label htmlFor="rating">Rating</label>
                    <input name="rating" type="text" value={titleData.rating} onChange={e => setTitleData({ ...titleData, rating: e.target.value })} />
                    <label htmlFor="reasoning">Reasoning</label>
                    <textarea name="reasoning" value={titleData.reasoning} onChange={e => setTitleData({ ...titleData, reasoning: e.target.value })}></textarea>
                    <button type="submit" className="">Add</button>
                </fieldset>
            </form>
        </div >
    )
}

const AddTitlePage = () => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [titleData, setTitleData] = useState({ rating: "", status: "unknown", reasoning: "", userID: Number(localStorage.getItem("userID")), data: {} });

    const search = (e) => {
        e.preventDefault();
        if (query.length >= 3) {
            let url = `https://api.jikan.moe/v3/search/anime?q=${query}&page=1`
            fetch(url)
                .then(res => res.json())
                .then(data => setSearchResults(data.results))
        }
    }

    if (Object.keys(titleData.data).length === 0) {
        return (
            <div className="text-white flex flex-col items-center justify-center">
                <h1 className="font-bold text-xl">Search anime by name</h1>
                <form className="flex flex-col" onSubmit={search}>
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="m-1 p-2 rounded-lg h-10 bg-gray-500"
                    />
                    <button
                        type="submit"
                        className="filter hover:brightness-90 bg-red-500 rounded-md p-2 mt-2 mx-1">
                        Search
                    </button>
                </form>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
                    {searchResults.map(result => <SearchResult key={result.mal_id} data={result} titleData={titleData} setTitleData={setTitleData} />)}
                </div>
            </div>
        )
    } else return (
        <div>
            <button className="" onClick={() => setTitleData({ ...titleData, data: {} })}>Back</button>
            <AddForm titleData={titleData} setTitleData={setTitleData} />
        </div>
    )
}

export default AddTitlePage;