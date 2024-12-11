import { configureChains, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { createPublicClient, http } from "viem";

// Configure chains & providers
const { chains } = configureChains([mainnet, sepolia], [publicProvider()]);

// Create wagmi config
export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
  ],
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});
