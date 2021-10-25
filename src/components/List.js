import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { LoginContext } from '../App';

const Tcontext = createContext(null);

const Delete = ({ mal_id }) => {
    const tcontext = useContext(Tcontext);
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
                if (data.message === "deleting-success") tcontext.setTitles(tcontext.titles.filter(e => e.mal_id !== mal_id))
            })
    }

    return (
        <button className="pure-button" onClick={() => deleteTitle()}><AiOutlineDelete size={20} /></button>
    )
}

const Edit = () => {
    const editTitle = () => {
        return null;
    }

    return (
        <button className="pure-button" onClick={() => editTitle()}><AiOutlineEdit size={20} /></button>
    )
}

const Title = ({ title, settings }) => {
    const { isLoggedIn } = useContext(LoginContext);
    const { pathname } = useLocation();

    return (
        <tr>
            <td><img className="title-thumbnail" src={title.thumbnail} alt={title.name} /></td>
            <td>{title.name}</td>
            <td>{title.status}</td>
            <td>{title.rating}</td>
            {settings.displayReasoning ? <td>{title.reasoning}</td> : undefined}
            {isLoggedIn && pathname === "/list" &&
                <td>
                    <Delete mal_id={title.mal_id} />
                    <Edit mal_id={title.mal_id} />
                </td>
            }
        </tr >
    )
}

const UserTitleList = ({ settings }) => {
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
        <Tcontext.Provider value={{ titles: titles, setTitles: setTitles }}>
            <div className="pure-g">
                <div className="pure-u-1 pure-u-md-1-3">
                    <table className="pure-table pure-table-horizontal">
                        <tbody>
                            {titles.map(title => <Title key={title.id} title={title} settings={settings} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </Tcontext.Provider>
    )
}

export default UserTitleList;