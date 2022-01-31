import React, { useState } from "react";
import { AiOutlineRollback } from 'react-icons/ai'
import { collection, addDoc } from "firebase/firestore";
import { app, db } from '../../firebase-config';
import { getAuth } from "firebase/auth";

const SearchResult = ({ data, titleData, setTitleData }) => {
    return (
        <div
            className="flex m-2 text-white bg-red-500 rounded-xl w-60 h-60 group"
            onClick={() => setTitleData({ ...titleData, data: data })}
        >
            <div
                className="flex flex-1 relative flex-col m-0.5 rounded-xl bg-gray-600 overflow-ellipsis overflow-hidden" >
                <img className="brightness-100 group-hover:brightness-25 transition w-full aspect-square absolute" src={data.image_url} alt="series-thumbnail" />
                <div className="z-10 p-2 opacity-0 group-hover:opacity-100 transition">
                    <h2 className="font-bold">{data.title}</h2>
                    <p className="pb-1">{data.synopsis}</p>
                </div>
            </div>
        </div>
    )
}

const AddForm = ({ titleData, setTitleData }) => {
    const sendData = async (e) => {
        e.preventDefault();
        if (getAuth(app).currentUser) {
            try {
                await addDoc(collection(db, "users", getAuth(app).currentUser.uid, "list"), titleData);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div className="p-5 w-full sm:w-3/4 md:w-2/3 xl:w-2/4 2xl:w-1/4 flex flex-col sm:flex-row">
                <img className="rounded-lg w-32" src={titleData.data.image_url} alt="anime title thumbnail" />
                <div className="flex flex-col m-5">
                    <h2 className="font-bold text-xl">{titleData.data.title}</h2>
                    <p className="max-h-32 overflow-ellipsis overflow-hidden">{titleData.data.synopsis}</p>
                </div>
            </div>
            <form className="flex flex-col w-full sm:w-3/4 md:w-2/3 xl:w-2/4 2xl:w-1/4" onSubmit={sendData}>
                <label htmlFor="status">Status</label>
                <select
                    name="status"
                    defaultValue="none"
                    onChange={e => setTitleData({ ...titleData, status: e.target.value })}
                    className="m-1 p-1 rounded-lg h-10 bg-gray-500"
                >
                    <option value="watching">Watching</option>
                    <option value="planning">Planning</option>
                    <option value="watched">Watched</option>
                    <option value="dropped">Dropped</option>
                    <option disabled={true} value="none">Select watch status</option>
                </select>
                <label htmlFor="rating">Rating</label>
                <input
                    name="rating"
                    type="text"
                    value={titleData.rating}
                    onChange={e => setTitleData({ ...titleData, rating: e.target.value })}
                    className="m-1 p-2 rounded-lg h-10 bg-gray-500"
                />
                <label htmlFor="reasoning">Reasoning</label>
                <textarea
                    name="reasoning"
                    value={titleData.reasoning}
                    onChange={e => setTitleData({ ...titleData, reasoning: e.target.value })}
                    className="mx-1 my-3 p-1 flex-1 rounded-lg bg-gray-500"
                ></textarea>
                <button type="submit" className="filter hover:brightness-90 bg-red-500 rounded-md p-2 m-1">Add</button>
            </form>
        </div >
    )
}

const AddTitlePage = () => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [titleData, setTitleData] = useState({
        rating: "",
        status: "unknown",
        reasoning: "",
        uid: "",
        data: {}
    });

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
        <div className="text-white">
            <button
                className="filter hover:brightness-90 bg-red-500 rounded-md p-2 ml-2"
                onClick={() => setTitleData({ ...titleData, data: {} })} >
                <AiOutlineRollback size={30} />
            </button>
            <AddForm titleData={titleData} setTitleData={setTitleData} />
        </div>
    )
}

export default AddTitlePage;