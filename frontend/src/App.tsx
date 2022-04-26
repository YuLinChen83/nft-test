import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import styled from "styled-components";
import { MEDIA_WIDTHS } from "./theme";

enum Network {
  ETHEREUM = "ETHEREUM",
  POLYGON = "POLYGON",
  SOLANA = "SOLANA",
}

const Title = styled.h1`
  margin: 12px 0;
  font-size: 3rem;
  font-family: "Titan One", cursive;
  span {
    position: relative;
    animation: scatter 1.75s infinite;

    :nth-child(2n),
    :last-child {
      color: ${({ theme }) => theme.white};
      text-shadow: 0px 0px 2px ${({ theme }) => theme.primary1};
      animation-delay: 0.3s;
    }
  }
`;
const AppWrapper = styled.div`
  background: ${({ theme }) => theme.bg3};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HeaderWrapper = styled.div`
  min-width: 100%;
  width: fit-content;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  position: sticky;
  top: 0px;
  padding: 0 16px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.bg4};
`;
const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  max-width: ${MEDIA_WIDTHS.upToMedium}px;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const MainWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 16px;
`;
const NetworkSelector = styled.div`
  position: relative;
  :hover div {
    display: block;
    li:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.primary1};
    }
  }
  div {
    display: none;
    position: absolute;
    margin: 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin: 8px 0 0 0;
    padding: 4px 12px 16px;
    background: ${({ theme }) => theme.white};
    border-radius: 12px;
    border: 3px solid ${({ theme }) => theme.bg2};
    li {
      height: 32px;
      display: flex;
      align-items: end;
      border-bottom: 1px solid ${({ theme }) => theme.bg2};
    }
  }
`;
const Button = styled.button<{ className?: "outline" }>`
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 12px;
  border: none;
  color: ${({ theme, className }) => (className ? theme.primary1 : theme.bg2)};
  background: ${({ theme, className }) =>
    className ? theme.white : theme.primary1};
  border: 1px solid
    ${({ theme, className }) => (className ? theme.primary1 : "none")};
  :hover {
    ${({ theme, className }) => (className ? "" : `color: ${theme.white}`)};
  }
`;
const PreTextButton = styled.span`
  display: flex;
  height: fit-content;
  border: 1px solid ${({ theme }) => theme.primary1};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.white};
  overflow: hidden;
  span {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 12px;
    color: ${({ theme }) => theme.primary1};
    transition: transform 450ms ease;
    :hover {
      transform: scale(1.2);
    }
  }
  button {
    flex: 1;
    border-radius: 0;
  }
`;

const web3Modal = new Web3Modal({
  network: "rinkeby", // https://testnets.opensea.io/
  providerOptions: {},
});

const shortenAddr = (address: string) =>
  address.slice(0, 6) + "..." + address.slice(0 - 4);

const App = () => {
  const [network, setNetwork] = useState(Network.ETHEREUM);
  const [wallet, setWallet] = useState({ address: "", balance: "" });

  const initWallet = async () => {
    const instance = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner(); // connect 的 wallet address

    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);

    setWallet({ address, balance: ethers.utils.formatEther(balance) });
  };

  return (
    <AppWrapper>
      <HeaderWrapper>
        <Header>
          <HeaderLeft>
            <a href="/">
              <Title className="playful">
                {Array.from("MOCHI").map((char) => (
                  <span key={char} aria-hidden="true">
                    {char}
                  </span>
                ))}
              </Title>
            </a>
          </HeaderLeft>
          <HeaderRight>
            <NetworkSelector>
              <Button>{network}</Button>
              <div>
                <ul>
                  {Object.values(Network).map((key) => (
                    <li key={key} onClick={() => setNetwork(key)}>
                      {key}
                    </li>
                  ))}
                </ul>
              </div>
            </NetworkSelector>
            <div>
              {wallet.address ? (
                <PreTextButton>
                  <span>{`${(+wallet.balance)
                    .toFixed(3)
                    .slice(0, -1)}ETH`}</span>
                  <Button
                    onClick={() => console.log("TODO: change the account")}
                  >
                    {shortenAddr(wallet.address)}
                  </Button>
                </PreTextButton>
              ) : (
                <Button
                  type="button"
                  className="outline"
                  onClick={() => initWallet()}
                >
                  Connect Wallet
                </Button>
              )}
            </div>
          </HeaderRight>
        </Header>
      </HeaderWrapper>
      <MainWrapper>
        {/* TODO */}
        Hey
        <a href="/">test</a>
        {/* <selectmenu className="my-select-menu">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </selectmenu> */}
        <div style={{ width: 100, background: "pink", height: "100vh" }}></div>
      </MainWrapper>
    </AppWrapper>
  );
};

export default App;
