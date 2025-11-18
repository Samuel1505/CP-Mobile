import React from 'react';
import { AppKitProvider, AppKitModal } from '@reown/appkit-react-native';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

// AppKit metadata
const metadata = {
  name: 'SB-Mobile',
  description: 'StreakBet Mobile - Crypto Prediction Markets',
  url: 'https://streak-bet.vercel.app',
  icons: ['https://streak-bet.vercel.app/icon.png'],
};

// Create AppKit instance
const projectId = process.env.EXPO_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

// Create wagmi config without connectors (AppKit will handle connections)
// This prevents window.ethereum errors in React Native
const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  // No connectors - AppKit handles wallet connections via WalletConnect
  ssr: true,
});

// Create query client
const queryClient = new QueryClient();

interface AppKitWrapperProps {
  children: React.ReactNode;
}

export function AppKitWrapper({ children }: AppKitWrapperProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppKitProvider
          metadata={metadata}
          projectId={projectId}
        >
          {children}
          <AppKitModal />
        </AppKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

