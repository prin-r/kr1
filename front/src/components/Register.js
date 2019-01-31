import React , { useState , useEffect } from 'react';
import { registerURL , getMessage , isUrl } from '../utils/services';
import { currentAccount , web3metamask , sign } from '../utils/web3Utils'
import Loadable from 'react-loadable';

const InputBox = Loadable({
    loader: () => import('../components/InputBox'),
    loading: () => (<div>...loading</div>)
});

const Page = () => {

    const [msg, setMsg] = useState("");
    const [address, setAddress] = useState("");
    const [sig, setSig] = useState(null);
    const [url, setUrl] = useState("");

    useEffect(async () => {
        setAddress(await currentAccount());
    }, []);

    const register = async () => {
        if (!sig || address.length !== 42) return;
        if (!isUrl(url)) {alert(url + " is not url");return;}
        const registration = {address: address, url: url, ...sig};
        alert("your route is " + (await registerURL(registration)) + "");
    };

    const getMsg = async () => address.length === 42 && setMsg(await getMessage(address));

    const signMsg = async () => msg.length === 16 && setSig(await sign(msg, address));

    return (
        <center>
            <h1>Registration page</h1>
            <h3>Your address is </h3>
            <InputBox val={address} click={getMsg} change={setAddress} type={web3metamask? 0:1} buttonText={"get proof"}/>
            {msg.length === 16 && <h3>Your proof is </h3>}
            {msg.length === 16 && <InputBox val={msg} click={signMsg} change={setMsg} type={0} buttonText={"sign the proof"}/>}
            {sig && <h3>Insert yor url</h3>}
            {sig && <InputBox val={url} change={setUrl} type={2} buttonText={"register url"} />}
            {sig && <button onClick={register}>register</button>}
        </center>
    );
}

export default Page;