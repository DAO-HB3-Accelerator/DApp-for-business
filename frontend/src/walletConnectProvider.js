import SignClient from "@walletconnect/sign-client";

let signClient;

const initWalletConnect = async () => {
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
};

export { signClient, initWalletConnect };
