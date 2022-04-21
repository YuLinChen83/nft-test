import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

const web3Modal = new Web3Modal({
  network: "rinkeby", // https://testnets.opensea.io/
  providerOptions: {},
});

const shortenAddr = (address: string) => address.slice(0, 4) + "..." + address.slice(0. - 4);

const App = () => {
  const [wallet, setWallet] = useState({ address: "", balance: "" });

  const initWallet = async () => {
    const instance = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();  // connect 的 wallet address

    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);

    setWallet({ address, balance: ethers.utils.formatEther(balance) });
  };

  return (
    <div className="d:flex flex:col m:40">
      <div className="d:flex justify-content:center">
        <h1 className="font:40 font:heavy font:italic ">
          Hello, {shortenAddr(wallet.address)}
        </h1>
      </div>
      <div className="d:flex justify-content:center">
        <p className="my:8">You have {wallet.balance} Ethers.</p>
      </div>
      <div className="d:flex justify-content:center mt:8">
        <button className="bg:black font:white px:12 py:4" type="button" onClick={() => initWallet()}>Connect Wallet</button>
      </div>
    </div>
  );
}

export default App;
