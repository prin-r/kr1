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

export const isHex = (hex) => (hex).match(/^(0x){0,1}[a-fA-F0-9]+$/);
export const isUrl = (url) => (url).match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);
