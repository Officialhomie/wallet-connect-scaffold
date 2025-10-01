import { http } from "viem";
import { mainnet, sepolia, base, baseSepolia } from "viem/chains";
import { env } from "./env";

export const chains = [mainnet, base, ...(env.enableTestnets ? [sepolia, baseSepolia] : [])] as const;

export const transports = {
  [mainnet.id]: http(),
  [sepolia.id]: http(),
  [base.id]: http(),
  [baseSepolia.id]: http(),
};

export function getChain(chainId: number) {
  return chains.find(chain => chain.id === chainId);
}