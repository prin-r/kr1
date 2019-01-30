import { get , post } from 'axios'

const serveURL = 'http://localhost:9091/'

export const registerURL = async (registration) => {
    const { data } = await post(serveURL + 'register', registration);
    return data;
};

export const tryToAccess = async (id) => {
    const { data } = await get(serveURL + 'mapping/' + id);
    return data;
}

export const getMessage = async (id) => {
    const { data } = await get(serveURL + 'getmessage/' + id);
    return data;
};

export const handleHex = (hex, func) => (hex).match(/^(0x){0,1}[a-fA-F0-9]+$/) && func();
