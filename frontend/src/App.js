import React, { useState } from 'react';
import { initWalletConnect } from './walletConnectProvider';
import './App.css';

function App() {
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    await initWalletConnect();
    setConnected(true);
    console.log('Wallet connected!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Web3 DApp</h1>
        <p>Click the button below to connect your wallet:</p>
        <button onClick={connectWallet} disabled={connected}>
          {connected ? 'Wallet Connected' : 'Connect Wallet'}
        </button>
      </header>
    </div>
  );
}

export default App;

