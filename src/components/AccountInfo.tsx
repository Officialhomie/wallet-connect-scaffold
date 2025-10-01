"use client";

import { useAccount, useChainId, useChains } from "wagmi";
import { useBalance } from "@/hooks/useBalance";
import { NetworkSwitcher } from "./NetworkSwitcher";

export function AccountInfo() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const chains = useChains();
  const { formatted, symbol, isLoading } = useBalance(address);

  const currentChain = chains.find((chain) => chain.id === chainId);

  if (!isConnected || !address) {
    return (
      <div className="text-center p-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">
          Connect your wallet to view account information
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold">Account Information</h3>
      
      <div className="space-y-2">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
          <p className="font-mono text-sm break-all">{address}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Network</p>
          <p className="font-medium">{currentChain?.name || "Unknown"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Balance</p>
          {isLoading ? (
            <p className="text-sm">Loading...</p>
          ) : (
            <p className="font-medium">
              {formatted} {symbol}
            </p>
          )}
        </div>
      </div>

      <NetworkSwitcher />
    </div>
  );
}


