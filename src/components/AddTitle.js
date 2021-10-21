import React, { useState } from "react";

const AnimeTitle = ({ data }) => {
    return (
        <div className="search-result">
            <img src={data.image_url} />
            <h5>{data.title}</h5>
        </div>
    )
}


const AddTitlePage = () => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const search = () => {
        let url = `https://api.jikan.moe/v3/search/anime?q=${query}&page=1`
        fetch(url)
            .then(res => res.json())
            .then(data => setSearchResults(data.results))
    }

    return (
        <div>
            <h1>Search for anime</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                search();
            }}>
                <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            {searchResults.map(result => <AnimeTitle data={result} />)}
        </div>
    )
}

export default AddTitlePage;