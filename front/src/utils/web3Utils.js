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
    if (!signature || signature.length !== 132) {
        return null;
    }
    // const tmp = '0xx'+signature.substr(3)
    // console.log(tmp);
    return {sig: signature};
};