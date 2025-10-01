import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum, base, sepolia, baseSepolia, type AppKitNetwork } from '@reown/appkit/networks'
import { QueryClient } from '@tanstack/react-query'
import { env } from './env'

// Setup queryClient
export const queryClient = new QueryClient()

// Get projectId from environment
if (!env.projectId && typeof window !== 'undefined') {
  throw new Error('Project ID is not set')
}

// Define networks based on environment - AppKit requires at least one network
const networks: AppKitNetwork[] = env.enableTestnets 
  ? [mainnet, arbitrum, base, sepolia, baseSepolia]
  : [mainnet, arbitrum, base]

// Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId: env.projectId,
  ssr: true
})

// Create AppKit instance
export const appkit = createAppKit({
  adapters: [wagmiAdapter],
  networks: networks as [AppKitNetwork, ...AppKitNetwork[]],
  projectId: env.projectId,
  metadata: {
    name: env.appName,
    description: env.appDescription,
    url: env.appUrl,
    icons: [`${env.appUrl}/favicon.ico`]
  },
  features: {
    analytics: true, // Optional - for usage analytics
    email: true, // Enable email login
    socials: ['google', 'apple', 'discord', 'github'], // Social login options
    emailShowWallets: true, // Show wallet options alongside email
    onramp: true, // Enable fiat onramp
    swaps: true, // Enable token swaps
  }
})

// Export wagmi config from adapter
export const wagmiConfig = wagmiAdapter.wagmiConfig