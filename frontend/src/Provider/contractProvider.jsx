import { useState, useEffect, createContext } from "react";
import { ethers } from 'ethers'
import contractArtifact from '../Ethereum/Post.json'
import { useMoralis, useMoralisFile } from "react-moralis";

export const UserContext = createContext("appContext");

const UserProvider = (props) => {

  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState('');

  const contractAddress = "0x2c7E6d8f0784752e2614e7ac37C6A7977Cb3B839"
  const _initEthers = async () => {
    let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
    let contractInstance = new ethers.Contract(contractAddress, contractArtifact.abi, ethProvider.getSigner(0));
    setContract(contractInstance);
  }
  
  const _initApp = async () => {
    if (window.ethereum === undefined) {
      // _raiseError();
      return;
    }
    const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(selectedAddress);
    if(selectedAddress !== '') {
      setAddress(selectedAddress);
     await _initEthers();
    }
    window.ethereum.on("accountsChanged", async ([newAddress]) => {
      if (newAddress === undefined) {
        return this._resetState();
      }
      const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAddress(selectedAddress);
    })

  }
  
  return (
    // eslint-disable-next-line react/prop-types
    <UserContext.Provider value = {{ contract, address, _initApp }}> {props.children} </UserContext.Provider>
  );
};

export default UserProvider;