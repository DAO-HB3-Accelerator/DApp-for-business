import SignClient from "@walletconnect/sign-client";

// Инициализация переменной для клиента
let signClient;
let session;

// Функция для инициализации WalletConnect
const initWalletConnect = async () => {
  try {
    // Инициализация клиента WalletConnect
    signClient = await SignClient.init({
      projectId: "0a638a0eb4f44e61eb6497f883765994", // Зарегистрируйте проект на https://cloud.walletconnect.com/
      relayUrl: "wss://relay.walletconnect.com", // URL релея для WebSocket-соединения
      metadata: {
        name: "DApp",
        description: "DApp for business",
        url: "https://your-dapp.com",
        icons: ["https://your-dapp.com/icon.png"],
      },
    });

    console.log("WalletConnect client initialized successfully");
  } catch (error) {
    console.error("Error initializing WalletConnect client:", error);
  }
};

// Функция для создания сессии
const createSession = async () => {
  try {
    // Если клиент не инициализирован
    if (!signClient) {
      throw new Error("WalletConnect client is not initialized");
    }

    // Создание сессии (подключение кошелька)
    session = await signClient.connect({
      method: "wallet_connect",
      params: [
        {
          chainId: 1, // Ethereum Mainnet (или используйте другой ID сети)
        },
      ],
    });

    console.log("Wallet connected:", session);
  } catch (error) {
    console.error("Error creating WalletConnect session:", error);
  }
};

// Функция для отправки транзакции через WalletConnect
const sendTransaction = async (transactionData) => {
  try {
    if (!session) {
      throw new Error("No active WalletConnect session");
    }

    const result = await signClient.request({
      method: "eth_sendTransaction",
      params: [transactionData],
    });

    console.log("Transaction sent successfully:", result);
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
};

// Функция для отключения сессии
const disconnectWallet = async () => {
  try {
    if (!session) {
      throw new Error("No active WalletConnect session to disconnect");
    }

    await signClient.disconnect();

    console.log("Wallet disconnected successfully");
  } catch (error) {
    console.error("Error disconnecting wallet:", error);
  }
};

// Экспортируем функции
export { initWalletConnect, createSession, sendTransaction, disconnectWallet };

