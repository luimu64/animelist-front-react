import React, { useState } from "react";

const SearchResult = ({ data, titleData, setTitleData }) => {
    return (
        <div className="search-result" onClick={() => setTitleData({ ...titleData, data: data })}>
            <h5>{data.title}</h5>
            <p>{data.synopsis}</p>
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
            <form className="pure-form pure-form-stacked" onSubmit={sendData}>
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
                    <button type="submit" className="pure-button">Add</button>
                </fieldset>
            </form>
        </div >
    )
}

const AddTitlePage = () => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [titleData, setTitleData] = useState({ rating: "", status: "unknown", reasoning: "", userID: localStorage.getItem("userID"), data: {} });

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
            <div>
                <h1>Search for anime</h1>
                <form className="pure-form" onSubmit={search}>
                    <fieldset>
                        <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
                        <button type="submit" className="pure-button pure-button-primary">Search</button>
                    </fieldset>
                </form>
                {searchResults.map(result => <SearchResult key={result.mal_id} data={result} titleData={titleData} setTitleData={setTitleData} />)}
            </div>
        )
    } else return (
        <div>
            <button className="pure-button" onClick={() => setTitleData({ ...titleData, data: {} })}>Back</button>
            <AddForm titleData={titleData} setTitleData={setTitleData} />
        </div>
    )
}

export default AddTitlePage;