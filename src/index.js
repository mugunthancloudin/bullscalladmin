import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { MetaMaskProvider } from "@metamask/sdk-react";
// import { MetaMaskProvider } from "@metamask/sdk-react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  injectedWallet,
  trustWallet,
  okxWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  RainbowKitProvider,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig, } from 'wagmi';
import {
  // polygon,
  // sepolia,
  polygonMumbai
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
    
  const { chains, publicClient } = configureChains(
      [polygonMumbai],
      [
        // wss://polygon-mumbai.g.alchemy.com/v2/q0h4BPlvsPC7SXZq61n3S3H7AqxD64sn
        //wss://polygon-mumbai.g.alchemy.com/v2/q0h4BPlvsPC7SXZq61n3S3H7AqxD64sn
        // alchemyProvider({ apiKey: 'q0h4BPlvsPC7SXZq61n3S3H7AqxD64sn'}),
        infuraProvider({apiKey: '08828a2b10ca496fa18caac08cb74410'}),
        publicProvider(),
      ]
    );
    
  const connectors = connectorsForWallets([
      {
        groupName: 'Recommended',
        wallets: [
          rainbowWallet({ projectId: '366a122e81a654cbe9d663c2663e42dd', chains }),
          metaMaskWallet({  projectId: '366a122e81a654cbe9d663c2663e42dd',chains }),
          coinbaseWallet({ projectId: '366a122e81a654cbe9d663c2663e42dd',chains, appName: 'Candle Genie' }),
          walletConnectWallet({ projectId: '366a122e81a654cbe9d663c2663e42dd', chains }),
        ],
      },
      {
        groupName: 'Others',
        wallets: [
          injectedWallet({ chains }),  
          trustWallet({ projectId: '366a122e81a654cbe9d663c2663e42dd',chains }),
          ledgerWallet({ projectId: '366a122e81a654cbe9d663c2663e42dd',chains }),
          okxWallet({ projectId: '366a122e81a654cbe9d663c2663e42dd',chains }),            
        ],
      },
    ]);
    
    const wagmiConfig = createConfig({
      autoConnect: false,
      connectors,
      publicClient,
    })
    
    // const myCustomTheme: Theme = {
    //   colors: {
    //     connectButtonBackground: '#ef9c32'
    //   }
    // };
  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     {/* <MetaMaskProvider debug={false} sdkOptions={{
      checkInstallationImmediately: false,
      dappMetadata: {
        name: "Demo React App",
        url: window.location.host,
      }
    }}> */}
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        initialChain={polygonMumbai}
        coolMode
        {...App}
      >
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
    {/* </MetaMaskProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
export {chains};
reportWebVitals();
