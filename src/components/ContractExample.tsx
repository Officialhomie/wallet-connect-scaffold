"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useERC20Balance, useERC20Transfer } from "@/hooks/useERC20";
import { useSendEth, useTransactionReceipt } from "@/hooks/useTransaction";

// Example USDC on Base - replace with your contract
const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

export function ContractExample() {
  const { isConnected } = useAccount();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  // ERC20 Token example
  const { formatted, symbol, isLoading } = useERC20Balance(USDC_BASE);
  const { transfer, isPending: isTransferring, data: transferHash } = useERC20Transfer(USDC_BASE);

  // ETH Transfer example
  const { sendEth, isPending: isSendingEth, hash: ethHash } = useSendEth();

  // Transaction receipts
  const { data: transferReceipt } = useTransactionReceipt(transferHash);
  const { data: ethReceipt } = useTransactionReceipt(ethHash);

  const handleTransferToken = () => {
    if (recipient && amount) {
      transfer(recipient as `0x${string}`, amount, 6); // USDC has 6 decimals
    }
  };

  const handleSendEth = () => {
    if (recipient && amount) {
      sendEth(recipient as `0x${string}`, amount);
    }
  };

  if (!isConnected) {
    return (
      <div className="p-6 border rounded-lg">
        <p className="text-gray-500">Connect your wallet to use contracts</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 border rounded-lg">
      <h3 className="text-lg font-semibold">Contract Integration Example</h3>
      
      {/* Token Balance */}
      <div>
        <h4 className="font-medium mb-2">Token Balance (USDC on Base)</h4>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>{formatted} {symbol}</p>
        )}
      </div>

      {/* Transfer Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Recipient Address</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleTransferToken}
            disabled={isTransferring || !recipient || !amount}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {isTransferring ? "Transferring..." : "Transfer USDC"}
          </button>
          
          <button
            onClick={handleSendEth}
            disabled={isSendingEth || !recipient || !amount}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            {isSendingEth ? "Sending..." : "Send ETH"}
          </button>
        </div>
      </div>

      {/* Transaction Status */}
      {transferHash && (
        <div>
          <p className="text-sm">Transfer Hash: {transferHash}</p>
          {transferReceipt && (
            <p className="text-sm text-green-600">✓ Transfer confirmed</p>
          )}
        </div>
      )}

      {ethHash && (
        <div>
          <p className="text-sm">ETH Transfer Hash: {ethHash}</p>
          {ethReceipt && (
            <p className="text-sm text-green-600">✓ ETH transfer confirmed</p>
          )}
        </div>
      )}
    </div>
  );
}