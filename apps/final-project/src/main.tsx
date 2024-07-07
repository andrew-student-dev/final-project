import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { WagmiProvider, createConfig } from "wagmi";
import * as chains from "viem/chains";

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const wagmiConfig = createConfig({
  chains: [chains.hardhat],
  connectors: wagmiConnectors,
  ssr: true,
  client({ chain }) {
    return createClient({
      chain,
      transport: http(getAlchemyHttpUrl(chain.id)),
      ...(chain.id !== (hardhat as Chain).id
        ? {
            pollingInterval: scaffoldConfig.pollingInterval,
          }
        : {}),
    });
  },
});

root.render(
  <StrictMode>
    <WagmiProvider config={wagmiConfig}>
    <App />
    </WagmiProvider>
  </StrictMode>
);
