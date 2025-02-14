import React from "react";
import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { arbitrum, mainnet } from '@reown/appkit/networks';
import TokenBalance from "./TokenBalance";
import TransferTokens from "./TransferTokens";
import UserDashboard from "./components/UserDashboard";
import "./App.css";

// 1. Get projectId
const projectId = process.env.REACT_APP_PROJECT_ID;

// 2. Set the networks
const networks = [arbitrum, mainnet];

// 3. Create a metadata object
const metadata = {
  name: 'DApp for Business',
  description: 'AppKit Example',
  url: window.location.origin, // Используем текущий origin для разработки
  icons: ['https://assets.reown.com/reown-profile-pic.png']
};

// 4. Create a AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true
  }
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Web3 DApp</h1>
        <p>Подключите кошелек через reown/appkit:</p>
        {/* @ts-expect-error Временное решение для React v19 */}
        <appkit-button />
      </header>
      <main>
        <UserDashboard />
        <TokenBalance />
        <TransferTokens />
      </main>
    </div>
  );
}

export default App;
