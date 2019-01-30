import React , { useState , useEffect } from 'react';
import { tryToAccess } from '../utils/services';

const GetLink = ({ match }) => {

    const [content, setContent] = useState("loading ...");

    useEffect(async () => {
        match && 
        match.params && 
        match.params.id &&
        setContent(await tryToAccess(match.params.id));
    }, []);

    return (
        <div>
            <p>{content}</p>
            <button onClick={() => console.log(match)}>click to print props</button>
        </div>
    );
};

export default GetLink;