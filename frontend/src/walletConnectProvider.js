import { createSession as importedCreateSession, disconnectWallet } from "@reown/appkit";

let signClient;
let session; // Убрано export для устранения конфликта

export const initWalletConnect = async () => {
  try {
    signClient = await SignClient.init({
      projectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID,
      relayUrl: "wss://relay.walletconnect.com",
      metadata: {
        name: "DApp",
        description: "DApp for business",
        url: window.location.origin,
        icons: [`${window.location.origin}/icon.png`],
      },
    });

    console.log("WalletConnect client initialized successfully");
  } catch (error) {
    console.error("Error initializing WalletConnect client:", error);
    throw error;
  }
};

// ... existing code ...

export const createSession = async () => {
  try {
    if (!signClient) {
      throw new Error("WalletConnect client is not initialized");
    }

    const { uri, approval } = await signClient.connect({
      requiredNamespaces: {
        eip155: {
          methods: ["eth_sendTransaction", "eth_sign"],
          chains: ["eip155:17000"], // Holesky
          events: ["chainChanged", "accountsChanged"],
        },
      },
    });

    session = await approval();
    return session;
  } catch (error) {
    console.error("Error creating WalletConnect session:", error);
    throw error;
  }
};

// Логика отключения кошелька
export const disconnectWallet = async () => {
  try {
    if (!signClient) {
      throw new Error("WalletConnect client is not initialized");
    }

    await signClient.disconnect();
    console.log("Wallet disconnected successfully");
  } catch (error) {
    console.error("Error disconnecting wallet:", error);
    throw new Error("Ошибка при отключении кошелька: " + error.message);
  }
};

// Убедитесь, что session экспортируется правильно
export const getSession = () => session; // Функция для получения текущей сессии

// ... rest of the existing code ...