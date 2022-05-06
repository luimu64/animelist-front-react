import React, { useState } from "react";
import { AiOutlineRollback } from 'react-icons/ai'
import { doc, setDoc } from "firebase/firestore";
import { app, db } from '../../firebase-config';
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { TextField, Button, TextArea, Dropdown } from "../Inputs";

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
    const auth = getAuth(app);
    const [user, loading, error] = useAuthState(auth);

    const sendData = async (e) => {
        e.preventDefault();
        if (user) {
            try {
                await setDoc(doc(db, "users", user.uid, "list", `${titleData.data.mal_id}`), titleData);
            } catch (e) {
                console.error("Error adding title: ", e);
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
                <Dropdown
                    options={[
                        { text: 'Watching', value: 'watching' },
                        { text: 'Planning', value: 'planning' },
                        { text: 'Watched', value: 'watched' },
                        { text: 'Dropped', value: 'dropped' }
                    ]}
                    onChange={value => setTitleData({ ...titleData, status: value })}
                />
                <label htmlFor="rating">Rating</label>
                <TextField
                    name="rating"
                    type="text"
                    value={titleData.rating}
                    onChange={e => setTitleData({ ...titleData, rating: e.target.value })}
                />
                <label htmlFor="reasoning">Reasoning</label>
                <TextArea
                    name="reasoning"
                    value={titleData.reasoning}
                    onChange={e => setTitleData({ ...titleData, reasoning: e.target.value })}
                />
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
                    <TextField
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <Button
                        type="submit"
                        text="Search"
                    />
                </form>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
                    {searchResults.map(result => <SearchResult key={result.mal_id} data={result} titleData={titleData} setTitleData={setTitleData} />)}
                </div>
            </div>
        )
    } else return (
        <div className="text-white">
            <Button
                onClick={() => setTitleData({ ...titleData, data: {} })}
                icon={<AiOutlineRollback size={30} />}
            />
            <AddForm titleData={titleData} setTitleData={setTitleData} />
        </div>
    )
}

export default AddTitlePage;