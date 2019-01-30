import React , { useState , useEffect } from 'react';
import { registerURL , getMessage } from '../utils/services';
import { currentAccount , web3metamask , sign } from '../utils/web3Utils'

import InputBox from '../components/InputBox';

const Page = () => {

    const [message, setMessage] = useState("");
    const [address, setAddress] = useState("");
    const [rsv, setRSV] = useState(null);
    const [url, setUrl] = useState("");

    useEffect(async () => {
        setAddress(await currentAccount());
    }, []);

    const register = async () => {
        if (!rsv || !rsv.r || !rsv.s || !rsv.v || address.length !== 42) return;
        const registration = {address: address, url: url, ...rsv};
        console.log(await registerURL(registration));
    };

    const getMsg = async () => address.length === 42 && setMessage(await getMessage(address));

    const signMsg = async () => message.length === 16 && setRSV(await sign(message, address));

    return (
        <div>
            <h1>Registration page</h1>
            <h3>Your address is </h3>
            <InputBox val={address} click={getMsg} change={setAddress} type={web3metamask? 0:1} buttonText={"get message"}/>
            {message.length === 16 && <h3>Your message is </h3>}
            {message.length === 16 && <InputBox val={message} click={signMsg} change={setMessage} type={0} buttonText={"sign the message"} />}
            {rsv && <h3>Insert yor url</h3>}
            {rsv && <InputBox val={url} change={setUrl} type={2} buttonText={"register url"} />}
            {rsv && <button onClick={register}>register</button>}
        </div>
    );
}

export default Page;