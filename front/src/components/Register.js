import React from 'react';
import { post } from 'axios'

const Page = () => {

    const register = async () => {

        const { data } = await post('http://localhost:9091/register', {"id": "ssssss"});

        console.log(data);
    };

    return (
        <div>
            <h1>This is a register page</h1>
            <button onClick={() => register()}>register</button>
        </div>
    );
}

export default Page;