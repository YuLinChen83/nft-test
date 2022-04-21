require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: { version: "0.8.8" },
  networks: {
    rinkeby: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
