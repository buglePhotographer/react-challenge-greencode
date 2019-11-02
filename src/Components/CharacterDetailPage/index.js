import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ReactJson from 'react-json-view'
import API from '../../Api/StarWars';

function isEmpty(obj) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
}


function CharacterDetailPage(props) {
    const [data, setData] = useState({});
    const { id } = props.match.params;
    useEffect(() => {
        API.get(`people/${id}`).then(response => {
            console.log('Fetching data...', response.data);
            setData(response.data);
        });
    }, []);

    return (
        <div>
            <Link to="/" >Back to list</Link>
            {!isEmpty(data) ? <ReactJson src={data} /> : <div>Fetching data, please wait...</div>}
        </div>
    );
}

export default CharacterDetailPage;