import React from 'react'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'

const Title = ({ title, settings }) => {
    return (
        <tr>
            <td><img className="title-thumbnail" src={title.thumbnail} alt={title.name} /></td>
            <td>{title.name}</td>
            <td>{title.status}</td>
            <td>{title.rating}</td>
            {settings.displayReasoning ? <td>{title.reasoning}</td> : undefined}
        </tr >
    )
}

const TitleList = ({ settings }) => {
    let [titles, setTitles] = useState([]);
    let { userid } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8080/aniapi/getAll/${userid}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then((data => setTitles(data)))
    })

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

export default TitleList;