import React from 'react';
import { post } from 'axios'

const Page = () => {

    const register = async () => {
        const config = {
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*'
            }
        };

        const data = {
            "id": "ssssss"
        };
        
        const res = await post('http://localhost:9091/register/', data, config);

        console.log(res);
    };

    return (
        <div>
            <h1>This is a register page</h1>
            <button onClick={() => register()}>register</button>
        </div>
    );
}

export default Page;