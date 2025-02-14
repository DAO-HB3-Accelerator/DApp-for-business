import { useAppKitAccount } from "@reown/appkit/react";

export function useWalletConnection() {
  const { address, isConnected } = useAppKitAccount();
  
  return {
    isConnected,
    address
  };
} 