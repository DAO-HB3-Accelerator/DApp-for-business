import React, { useState } from "react";
import { ethers } from "ethers"; // Импорт ethers
import { getContract } from "./contract";

function TokenBalance() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("N/A");

  const fetchBalance = async () => {
    try {
      const contract = await getContract();
      const balance = await contract.balanceOf(address);
      setBalance(`${ethers.formatEther(balance)} MyToken`);
    } catch (error) {
      console.error(error);
      setBalance("Error");
    }
  };

  return (
    <div>
      <h1>Token Balance</h1>
      <input
        type="text"
        placeholder="Enter address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={fetchBalance}>Check Balance</button>
      <p>Balance: {balance}</p>
    </div>
  );
}

export default TokenBalance;
