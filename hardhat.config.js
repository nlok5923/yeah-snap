require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.1",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  // defaultNetwork: "goerli",
  // networks: {
  //    hardhat: {},
  //    goerli: {
  //       url: process.env.API_URL,
  //       accounts: [process.env.PRIVATE_KEY]
  //    }
  // },
  defaultNetwork: "matic",
  networks: {
    hardhat: {},
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETH_KEY
  }
};
