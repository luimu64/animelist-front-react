import React from 'react'
import { useParams } from 'react-router'

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

const TitleList = ({ titles, settings }) => {
    let { userid } = useParams();
    return (
        <div className="pure-g">
            <div className="pure-u-1 pure-u-md-1-3">
                <table className="pure-table pure-table-horizontal">
                    <thead>
                        <tr>
                            <th>Banner</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Rating</th>
                            {settings.displayReasoning ? <th>Reasoning</th> : undefined}
                        </tr>
                    </thead>
                    <tbody>
                        {titles.map(title => <Title key={title.id} title={title} settings={settings} />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TitleList;