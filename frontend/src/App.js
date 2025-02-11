import React, { useState } from "react";
import { initWalletConnect, createSession, disconnectWallet } from "./walletConnectProvider";
import TokenBalance from "./TokenBalance";
import TransferTokens from "./TransferTokens";
import "./App.css";

const reownApiKey = process.env.REACT_APP_REOWN_API_KEY;

function App() {
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    try {
      await initWalletConnect();
      await createSession();
      setConnected(true);
      console.log("Wallet connected!");
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const disconnect = async () => {
    try {
      await disconnectWallet();
      setConnected(false);
      console.log("Wallet disconnected!");
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Web3 DApp</h1>
        <p>Click the button below to connect your wallet:</p>
        <button onClick={connectWallet} disabled={connected}>
          {connected ? "Wallet Connected" : "Connect Wallet"}
        </button>
        {connected && (
          <button onClick={disconnect} style={{ marginTop: "10px" }}>
            Disconnect Wallet
          </button>
        )}
      </header>
      <main>
        {connected ? (
          <>
            <TokenBalance />
            <TransferTokens />
          </>
        ) : (
          <p>Please connect your wallet to interact with the DApp.</p>
        )}
      </main>
    </div>
  );
}

export default App;
