import React, { useState } from "react";
import { ethers } from "ethers";
import { getContract } from "./contract";

function TransferTokens() {
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [txHash, setTxHash] = useState(null);

    const validateAddress = (address) => {
        try {
            return ethers.isAddress(address);
        } catch {
            return false;
        }
    };

    const validateAmount = (value) => {
        try {
            const amount = parseFloat(value);
            return amount > 0 && !isNaN(amount);
        } catch {
            return false;
        }
    };

    const handleTransfer = async () => {
        setIsLoading(true);
        setError(null);
        setTxHash(null);

        try {
            // Валидация
            if (!validateAddress(to)) {
                throw new Error("Invalid recipient address");
            }
            if (!validateAmount(amount)) {
                throw new Error("Invalid amount");
            }

            const contract = await getContract();
            const tx = await contract.transfer(to, ethers.parseUnits(amount, 18));
            
            setTxHash(tx.hash);
            console.log("Transaction sent:", tx.hash);

            // Ждем подтверждения
            await tx.wait();
            
            // Очищаем поля
            setTo("");
            setAmount("");
            
        } catch (error) {
            console.error("Transfer error:", error);
            setError(error.message || "Transfer failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="transfer-container">
            <h2>Transfer Tokens</h2>
            {error && <div className="error-message">{error}</div>}
            {txHash && (
                <div className="success-message">
                    Transaction sent! Hash: {txHash}
                </div>
            )}
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Recipient address"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    disabled={isLoading}
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={isLoading}
                />
            </div>
            <button 
                onClick={handleTransfer} 
                disabled={isLoading || !to || !amount}
            >
                {isLoading ? "Processing..." : "Transfer"}
            </button>
        </div>
    );
}

export default TransferTokens;
