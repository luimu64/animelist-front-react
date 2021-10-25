import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import {
    AiOutlineDelete,
    AiOutlineEdit,
    AiOutlineCheck
} from "react-icons/ai"
import { LoginContext } from '../App';

const TitleContext = createContext(null);

const DeleteButton = ({ mal_id }) => {
    const { titles, setTitles } = useContext(TitleContext);
    const deleteTitle = () => {
        fetch(`${process.env.REACT_APP_APIURL}/aniapi/list/remove`,
            {
                method: 'POST',
                body: JSON.stringify({
                    mal_id: mal_id,
                    userID: Number(localStorage.getItem("userID"))
                }),
                headers: {
                    'Authentication': localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.message === "deleting-success") setTitles(titles.filter(e => e.mal_id !== mal_id))
            })
    }

    return (
        <button className="pure-button" onClick={() => deleteTitle()}><AiOutlineDelete size={20} /></button>
    )
}

const EditButton = ({ setEdinting }) => {
    const editTitle = () => {
        setEdinting(true);
    }

    return (
        <button className="pure-button" onClick={() => editTitle()}><AiOutlineEdit size={20} /></button>
    )
}

const ConfirmButton = ({ title, setEdinting }) => {
    const { titles, setTitles } = useContext(TitleContext);
    const updateTitle = () => {
        setTitles(titles.map(t => t.mal_id === title.mal_id ? title : t));
        setEdinting(false);
    }

    return (
        <button className="pure-button" onClick={() => updateTitle()}><AiOutlineCheck size={20} /></button>
    )
}

const Title = ({ titleData }) => {
    const [title, setTitle] = useState(titleData);
    const { isLoggedIn } = useContext(LoginContext);
    const { pathname } = useLocation();
    const [editing, setEdinting] = useState();

    if (editing) {
        return (
            <div className="title">
                <img className="title-thumbnail" src={title.thumbnail} alt={title.name} />
                <div className="title-info">
                    <h3>{title.name}</h3>
                    <input type="text" value={title.status} onChange={e => setTitle({ ...title, status: e.target.value })} />
                    <input type="text" value={title.rating} onChange={e => setTitle({ ...title, rating: e.target.value })} />
                    <input type="text" value={title.reasoning} onChange={e => setTitle({ ...title, reasoning: e.target.value })} />
                </div>
                {isLoggedIn && pathname === "/list" &&
                    <div className="title-actions">
                        <DeleteButton mal_id={title.mal_id} />
                        <ConfirmButton title={title} setEdinting={setEdinting} />
                    </div>
                }
            </div>
        )
    } else {
        return (
            <div className="title">
                <img className="title-thumbnail" src={title.thumbnail} alt={title.name} />
                <div className="title-info">
                    <h3>{title.name}</h3>
                    <p>{title.status}</p>
                    <p>{title.rating}</p>
                    <p>{title.reasoning}</p>
                </div>
                {isLoggedIn && pathname === "/list" &&
                    <div className="title-actions">
                        <DeleteButton mal_id={title.mal_id} />
                        <EditButton setEdinting={setEdinting} />
                    </div>
                }
            </div>
        )
    }
}

const UserTitleList = () => {
    let [titles, setTitles] = useState([]);
    const { isLoggedIn } = useContext(LoginContext);
    let { userID } = useParams();
    if (isLoggedIn) userID = localStorage.getItem("userID");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_APIURL}/aniapi/list/get/${userID}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then((data => setTitles(data)))
    }, [userID])

    return (
        <TitleContext.Provider value={{ titles: titles, setTitles: setTitles }}>
            <div className="title-wrapper">
                {titles.map(title => <Title key={title.id} titleData={title} />)}
            </div>
        </TitleContext.Provider>
    )
}

export default UserTitleList;