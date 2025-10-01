import { createConfig } from "wagmi";
import { walletConnect, injected, coinbaseWallet } from "wagmi/connectors";
import { chains, transports } from "./chains";
import { env } from "./env";

export const config = createConfig({
  chains,
  connectors: [
    injected(),
    coinbaseWallet({
      appName: env.appName,
    }),
    walletConnect({
      projectId: env.projectId,
      metadata: {
        name: env.appName,
        description: env.appDescription,
        url: env.appUrl,
        icons: [`${env.appUrl}/favicon.ico`],
      },
      showQrModal: true,
    }),
  ],
  transports,
});


