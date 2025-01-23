import React, { useState } from "react";
import { ethers } from "ethers"; // Импорт ethers
import { getContract } from "./contract";

function TransferTokens() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.transfer(to, ethers.parseUnits(amount, 18));
      await tx.wait();
      alert("Transfer successful!");
    } catch (error) {
      console.error(error);
      alert("Transfer failed.");
    }
  };

  return (
    <div>
      <h1>Transfer Tokens</h1>
      <input
        type="text"
        placeholder="Recipient address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
}

export default TransferTokens;
