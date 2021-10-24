import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AiOutlineDelete } from "react-icons/ai"


const Delete = ({ mal_id }) => {
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
            .then(data => console.log(data))
    }

    return (
        <button className="pure-button" onClick={() => deleteTitle()}><AiOutlineDelete size={20} /></button>
    )
}

const Title = ({ title, settings }) => {
    return (
        <tr>
            <td><img className="title-thumbnail" src={title.thumbnail} alt={title.name} /></td>
            <td>{title.name}</td>
            <td>{title.status}</td>
            <td>{title.rating}</td>
            {settings.displayReasoning ? <td>{title.reasoning}</td> : undefined}
            <td><Delete mal_id={title.mal_id} /></td>
        </tr >
    )
}

const UserTitleList = ({ settings }) => {
    let [titles, setTitles] = useState([]);
    let { userid } = useParams();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_APIURL}/aniapi/list/get/${userid}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then((data => setTitles(data)))
    }, [userid])

    return (
        <div className="pure-g">
            <div className="pure-u-1 pure-u-md-1-3">
                <table className="pure-table pure-table-horizontal">
                    <tbody>
                        {titles.map(title => <Title key={title.id} title={title} settings={settings} />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const MyTitleList = ({ settings }) => {
    let [titles, setTitles] = useState([]);

    useEffect(() => {
        const userID = localStorage.getItem("userID")
        fetch(`${process.env.REACT_APP_APIURL}/aniapi/list/get/auth/${userID}`,
            {
                headers: {
                    'Authentication': localStorage.getItem("token"),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then((data => setTitles(data)))
    }, [])
    if (titles.length > 0) {
        return (
            <div className="pure-g">
                <div className="pure-u-1 pure-u-md-1-3">
                    <table className="pure-table pure-table-horizontal">
                        <tbody>
                            {titles.map(title => <Title key={title.id} title={title} settings={settings} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    } else return <p>You don't have any anime titles added in your list</p>
}

export { UserTitleList, MyTitleList };