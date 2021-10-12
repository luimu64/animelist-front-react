import React from 'react'


const Title = ({ title, settings }) => {
    return (
        <tr>
            <td><img className="titleThumbnail" src={title.thumbnail} alt={title.name} /></td>
            <td>{title.name}</td>
            <td>{title.status}</td>
            <td>{title.rating}</td>
            {settings.displayReasoning ? <td>{title.reasoning}</td> : undefined}
        </tr >
    )
}

const TitleList = ({ titles, settings }) => {
    return (
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
    )
}

export default TitleList;