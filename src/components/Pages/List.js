import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, createContext, useContext, useEffect } from 'react';
import {
    AiOutlineDelete,
    AiOutlineEdit,
    AiOutlineCheck
} from "react-icons/ai"
import { collection, getDocs } from "firebase/firestore";
import { app, db } from '../../firebase-config';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const TitleContext = createContext(null);

const DeleteButton = ({ mal_id }) => {
    const { titles, setTitles } = useContext(TitleContext);
    const deleteTitle = () => {

    }

    return (
        <button className="" onClick={() => deleteTitle()}><AiOutlineDelete size={45} /></button>
    )
}

const EditButton = ({ setEditing }) => {
    const editTitle = () => {
        setEditing(true);
    }

    return (
        <button className="" onClick={() => editTitle()}><AiOutlineEdit size={45} /></button>
    )
}

const ConfirmButton = ({ title, setEditing }) => {
    const { titles, setTitles } = useContext(TitleContext);
    const updateTitle = () => {

    }

    return (
        <button className="" onClick={() => updateTitle()}><AiOutlineCheck size={45} /></button>
    )
}

const CardEditing = ({ title, setTitle, setEditing, pathname }) => {
    return (
        <div className="flex m-2 text-white bg-red-500 rounded-xl">
            <div className="flex flex-1 flex-row flex-wrap m-0.5 rounded-xl p-2 bg-gray-600">
                <img className="h-44 m-2 rounded-lg w-28" src={title.thumbnail} alt={title.name} />
                <div className="flex row flex-1 flex-wrap">
                    <div className="m-2 flex flex-col">
                        <h3 className="py-2 font-bold">{title.name}</h3>
                        <select
                            value={title.status}
                            className="m-1 p-1 rounded-lg h-10 bg-gray-500"
                            onChange={e => setTitle({ ...title, status: e.target.value })}
                        >
                            <option value="watching">Watching</option>
                            <option value="planning">Planning</option>
                            <option value="watched">Watched</option>
                            <option value="dropped">Dropped</option>
                        </select>
                        <input
                            className="m-1 p-2 rounded-lg h-10 bg-gray-500"
                            type="text"
                            value={title.rating}
                            onChange={e => setTitle({ ...title, rating: e.target.value })}
                        />

                    </div>
                    <textarea
                        className="mx-3 md:my-3 p-1 flex-1 rounded-lg bg-gray-500"
                        type="text"
                        value={title.reasoning}
                        onChange={e => setTitle({ ...title, reasoning: e.target.value })}
                    >
                    </textarea>
                </div>
            </div>
            {pathname === "/list" &&
                <div className="flex flex-col justify-around mr-1">
                    <ConfirmButton title={title} setEditing={setEditing} />
                </div>}
        </div>
    )
}

const CardPreviewing = ({ title, setEditing, pathname }) => {
    return (
        <div className="flex m-2 text-white bg-red-500 rounded-xl bg-opacity-90">
            <div className="flex flex-1 flex-row m-0.5 rounded-xl p-2 bg-gray-600">
                <img className="h-44 m-2 rounded-lg w-28" src={title.data.image_url} alt={title.data.title} />
                <div className="grid grid-cols-3">
                    <div className="m-2 col-span-3 md:col-span-1">
                        <h3 className="py-2 font-bold">{title.data.title}</h3>
                        <p className="py-1">{title.status}</p>
                        <p className="py-1">{title.rating}</p>
                        <p className="py-1 overflow-ellipsis overflow-hidden">{title.reasoning}</p>
                    </div>
                    <div className="col-span-2 m-2 hidden md:block">
                        <p>{title.data.synopsis}</p>
                    </div>
                </div>
            </div>
            {pathname === "/list" &&
                <div className="flex flex-col justify-around mr-1">
                    <DeleteButton mal_id={title.mal_id} />
                    <EditButton setEditing={setEditing} />
                </div>}
        </div>
    )
}

const Title = ({ titleData }) => {
    const [title, setTitle] = useState(titleData);
    const { pathname } = useLocation();
    const [editing, setEditing] = useState(false);

    if (editing) {
        return <CardEditing
            title={title}
            setTitle={setTitle}
            setEditing={setEditing}
            pathname={pathname}
        />
    }
    else {
        return <CardPreviewing
            title={title}
            setEditing={setEditing}
            pathname={pathname}
        />
    }
}

const UserTitleList = () => {
    let [titles, setTitles] = useState([]);
    const auth = getAuth(app);
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            getDocs(collection(db, "users", user.uid, "list"))
                .then(list => {
                    setTitles(list.docs);
                })
        }
    }, [user])

    return (
        <TitleContext.Provider value={{ titles: titles, setTitles: setTitles }}>
            {loading ? <p>Loading...</p> :
                <div className="title-wrapper">
                    {titles.map(title => <Title key={title.data().data.mal_id} titleData={title.data()} />)}
                </div>}
        </TitleContext.Provider>
    )
}

export default UserTitleList;