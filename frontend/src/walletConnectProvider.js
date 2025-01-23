import SignClient from "@walletconnect/sign-client";

// Инициализация переменных для клиента и сессии
let signClient;
let session;

// Функция для инициализации WalletConnect
export const initWalletConnect = async () => {
  try {
    signClient = await SignClient.init({
      projectId: "0a638a0eb4f44e61eb6497f883765994", // Зарегистрируйте проект на https://cloud.walletconnect.com/
      relayUrl: "wss://relay.walletconnect.com",
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

// Функция для создания сессии (подключение кошелька)
export const createSession = async () => {
  try {
    if (!signClient) {
      throw new Error("WalletConnect client is not initialized");
    }

    session = await signClient.connect({
      method: "wallet_connect",
      params: [
        {
          chainId: 17000, // Holesky Testnet
        },
      ],
    });

    console.log("Wallet connected:", session);
  } catch (error) {
    console.error("Error creating WalletConnect session:", error);
  }
};

// Функция для отправки транзакции
export const sendTransaction = async (transactionData) => {
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
export const disconnectWallet = async () => {
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

// Экспортируем текущую сессию
export { session };
