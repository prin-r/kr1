import Web3 from 'web3';

if (window.web3) {
    window.web3old = window.web3;
    window.web3metamask = new Web3(window.web3old.currentProvider);
    window.web3 = new Web3(window.ethereum);
}
  
export const web3metamask = window.web3metamask;
export const web3 = window.web3;

export const currentAccount = async () => {
    if (web3metamask) {
        const accounts = await web3metamask.eth.getAccounts();
        return accounts[0];
    } else {
        return "";
    }
};

export const sign = async (msg, address) => {
    let signature = "";
    try {
        signature = await web3metamask.eth.personal.sign(msg, address, "");
    } catch (e) {
        console.log(e);
        return null;
    }
    const r = signature.slice(0, 66);
    const s = '0x' + signature.slice(66, 130);
    const v = web3.utils.toDecimal('0x' + signature.slice(130, 132));
    return {r: r, s: s, v: v};
};