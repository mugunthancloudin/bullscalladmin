require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const { mnemonic } = require("./secrets.json");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "mumbai",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {},
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      chainId: 80001,
      gasPrice: 20000000000, // Adjust the gasPrice as needed for your tests
      accounts: { mnemonic: mnemonic },
    },
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      chainId: 5,
      accounts: {mnemonic: mnemonic},
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: "auto",
      accounts: { mnemonic: mnemonic },
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/WwOzwGSBtyRSL2o0sFX4AFEGbyJ1tfXV",
      accounts: [
        `736a61c7b4b6bd0a4b8fb66e5d76ac69329d7c8f4553063716c01f07364742cc`,
      ],
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 5000000000,
      accounts: { mnemonic: mnemonic },
    },
  },
  solidity: {
    version: "0.8.19",
    settings: {
      evmVersion:'paris',
      optimizer: {
        enabled: true,
        
      },
      viaIR: true
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://bscscan.com/
    // apiKey: "G2PQQ9KTX12QTRZ5TMSNHZ4PKM4SGW7639",//bnb
    // apiKey: "7XBNM7I42PJW8NP8GDT1475CTC6BRBAXMZ",//polygon

    // J6XX5W1D135S9Y9HQ5RNFCXSTZE4N5H1NJ
    apiKey: "J6XX5W1D135S9Y9HQ5RNFCXSTZE4N5H1NJ",
  },
  paths: {
    sources: "./src/contracts",
    artifacts: "./src/abis/",
  },

  mocha: {
    timeout: 20000,
  },
};
