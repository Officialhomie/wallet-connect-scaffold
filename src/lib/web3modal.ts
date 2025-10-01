import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { mainnet, arbitrum, base, sepolia, baseSepolia } from 'wagmi/chains'
import { env } from './env'

// Define networks based on environment  
const chains = env.enableTestnets
  ? [mainnet, base, arbitrum, sepolia, baseSepolia] as const
  : [mainnet, base, arbitrum] as const

// Create wagmi config
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId: env.projectId,
  metadata: {
    name: env.appName,
    description: env.appDescription,
    url: env.appUrl,
    icons: [`${env.appUrl}/favicon.ico`]
  }
})

// Create modal with Phase 1 features
createWeb3Modal({
  wagmiConfig,
  projectId: env.projectId,
  enableAnalytics: true, // Usage analytics
  enableOnramp: true, // Fiat onramp (Phase 2 preview)
  enableSwaps: true, // Token swaps (Phase 2 preview)
})

export { wagmiConfig }