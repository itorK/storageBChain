import * as Web3 from 'web3';
import {ABI_PATH, CONTRACT_ADDRESS, HTTP_PROVIDER} from "../enviroments/enviroment";


export const changeEthOwner = async (contract: any, owner: any) => {

    try {
        const owner = await contract.owner();
        await contract.changeOwner(owner, {from: owner});
    } catch (err) {
        return err;
    }
};


export const getEthConnection = async () => {
    const web3 = await new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER));
    let contract;

    const isAddress = web3.isAddress(CONTRACT_ADDRESS);

    if (isAddress) {
        contract = await web3.eth.contract(ABI_PATH).at(CONTRACT_ADDRESS);
    }

    return contract;
};

export const getEthOwner = async () => {
    try {
        let contract = await getEthConnection();
        const owner = await contract.owner();
        return owner;
    } catch (err) {
        return err
    }
}

export const addEthHash = async (hash: any, clientId: any, docId: any) => {
    try {
        let contract = await getEthConnection();
        const owner = await contract.owner();
        await contract.addHash(clientId, hash, docId, { from: owner })

        return 1;
    } catch (err) {
        return err;
    }
}

export const getEthHash = async (clientId: any, docId: any) => {
    try {
        let contract = await getEthConnection();
        const owner = await contract.owner();
        let hash = await contract.getHash(clientId, docId, { from: owner })
        return hash;
    } catch (err) {
        return err;
    }
}

export const deactivateEthDoc = async () => {
    try {
        let contract = await getEthConnection();
        const owner = await contract.owner()
        await contract.deactivate({from: owner});
        return 1;
    } catch (err) {
        return err;
    }
}

export const activateEthDoc = async () => {
    try {
        let contract = await getEthConnection();
        const owner = await contract.owner();
        await contract.activate({from: owner});
        return 1;
    } catch (err) {
        return err;
    }
}


export const getStateEthDoc = async () => {
    try {
        let contract = await getEthConnection();
        let state = await contract.state();
        return state;
    } catch (err) {
       return err;
    }
}



