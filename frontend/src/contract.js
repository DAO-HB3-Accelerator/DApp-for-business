import { ethers } from "ethers";
import { getSession } from "./walletConnectProvider"; // Импортируйте getSession вместо session

// Адрес и ABI контракта
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const REOWN_API_KEY = process.env.REACT_APP_REOWN_API_KEY; // Добавлено для использования API ключа
const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "initialSupply", "type": "uint256" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "address", "name": "spender", "type": "address" }
    ],
    "name": "allowance",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

let cachedProvider = null;
let cachedContract = null;
let lastChainId = null;

export const resetCache = () => {
    cachedProvider = null;
    cachedContract = null;
    lastChainId = null;
};

export async function getContract() {
    const session = getSession(); // Получаем сессию через getSession
    if (!session) {
        throw new Error("Wallet is not connected");
    }

    try {
        if (!cachedProvider) {
            cachedProvider = new ethers.BrowserProvider(session);
        }

        // Проверяем изменение сети
        const network = await cachedProvider.getNetwork();
        const currentChainId = network.chainId;

        if (lastChainId && lastChainId !== currentChainId) {
            resetCache();
            cachedProvider = new ethers.BrowserProvider(session);
        }

        lastChainId = currentChainId;

        if (!cachedContract) {
            const signer = await cachedProvider.getSigner();
            cachedContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        }

        return cachedContract;
    } catch (error) {
        console.error("Error getting contract:", error);
        resetCache();
        throw error;
    }
}
