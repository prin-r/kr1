import React , { useState , useEffect } from 'react';
import { get } from 'axios';

const GetLink = ({ match }) => {

    const [content, setContent] = useState("loading ...");

    useEffect(async () => {
        if (match && match.params) {
            const { data } = await get('http://localhost:9091/' + match.params.id);
            setContent(data);
        }
    });

    return (
        <div>
            <p>{content}</p>
            <button onClick={() => console.log(match)}>click to print props</button>
        </div>
    );
};

export default GetLink;