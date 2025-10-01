"use client";

import { useNetwork } from "@/hooks/useNetwork";
import { chains } from "@/lib/chains";

export function NetworkSwitcher() {
  const { chainId, currentChain, switchToChain, isSwitching } = useNetwork();

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-medium mb-3">Network</h3>
      
      <div className="mb-3">
        <p className="text-sm text-gray-600">
          Current: {currentChain?.name || "Unknown"}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {chains.map((chain) => (
          <button
            key={chain.id}
            onClick={() => switchToChain(chain.id)}
            disabled={isSwitching || chainId === chain.id}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              chainId === chain.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            } disabled:opacity-50`}
          >
            {isSwitching ? "..." : chain.name}
          </button>
        ))}
      </div>
    </div>
  );
}