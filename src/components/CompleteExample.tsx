"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useBalance } from "@/hooks/useBalance";
import { useERC20Balance, useERC20Transfer, useERC20Approve } from "@/hooks/useERC20";
import { useSendEth, useTransactionReceipt } from "@/hooks/useTransaction";
import { useNetwork } from "@/hooks/useNetwork";
import { useContractRead } from "@/hooks/useContract";

// Example contracts - replace with your own
const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const USDC_MAINNET = "0xA0b86a33E6441d8ae4b68b12188B4fea8fFb9f3A";

// Simple ERC20 ABI for name/symbol
const ERC20_ABI = [
  {
    type: "function",
    name: "name",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "string" }],
  },
  {
    type: "function",
    name: "symbol",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "string" }],
  },
];

export function CompleteExample() {
  const { address, isConnected } = useAccount();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [tokenAddress, setTokenAddress] = useState(USDC_BASE);
  const [spenderAddress, setSpenderAddress] = useState("");

  // 1. NETWORK MANAGEMENT
  const { chainId, currentChain, switchToChain, isSwitching } = useNetwork();

  // 2. NATIVE TOKEN BALANCE
  const { formatted: ethFormatted, symbol: ethSymbol, isLoading: ethLoading } = useBalance(address);

  // 3. ERC20 TOKEN OPERATIONS
  const { 
    formatted: tokenFormatted, 
    symbol: tokenSymbol, 
    decimals: tokenDecimals,
    isLoading: tokenLoading 
  } = useERC20Balance(tokenAddress as `0x${string}`);

  const { transfer, isPending: isTransferring, data: transferHash } = useERC20Transfer(tokenAddress as `0x${string}`);
  const { approve, isPending: isApproving, data: approveHash } = useERC20Approve(tokenAddress as `0x${string}`);

  // 4. ETH TRANSFERS
  const { sendEth, isPending: isSendingEth, hash: ethHash } = useSendEth();

  // 5. TRANSACTION RECEIPTS
  const { data: transferReceipt } = useTransactionReceipt(transferHash);
  const { data: approveReceipt } = useTransactionReceipt(approveHash);
  const { data: ethReceipt } = useTransactionReceipt(ethHash);

  // 6. DIRECT CONTRACT READS
  const { data: tokenName } = useContractRead({
    address: tokenAddress as `0x${string}`,
    abi: ERC20_ABI,
    functionName: "name",
  });

  // HANDLERS
  const handleTransferToken = () => {
    if (recipient && amount && tokenDecimals) {
      transfer(recipient as `0x${string}`, amount, tokenDecimals);
    }
  };

  const handleApproveToken = () => {
    if (spenderAddress && amount && tokenDecimals) {
      approve(spenderAddress as `0x${string}`, amount, tokenDecimals);
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
        <h3 className="text-lg font-semibold mb-4">Complete WalletConnect Example</h3>
        <p className="text-gray-500">Connect your wallet to see all features</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 border rounded-lg">
      <h3 className="text-lg font-semibold">Complete WalletConnect Example</h3>
      
      {/* NETWORK INFO */}
      <div className="p-4 bg-gray-50 rounded">
        <h4 className="font-medium mb-2">Network: {currentChain?.name}</h4>
        <div className="flex gap-2">
          <button
            onClick={() => switchToChain(1)}
            disabled={isSwitching || chainId === 1}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Mainnet
          </button>
          <button
            onClick={() => switchToChain(8453)}
            disabled={isSwitching || chainId === 8453}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Base
          </button>
        </div>
      </div>

      {/* BALANCES */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 border rounded">
          <h4 className="font-medium mb-2">Native Balance</h4>
          {ethLoading ? (
            <p>Loading...</p>
          ) : (
            <p>{ethFormatted} {ethSymbol}</p>
          )}
        </div>
        
        <div className="p-4 border rounded">
          <h4 className="font-medium mb-2">Token Balance</h4>
          <div className="mb-2">
            <select
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              className="w-full p-1 border rounded text-sm"
            >
              <option value={USDC_BASE}>USDC (Base)</option>
              <option value={USDC_MAINNET}>USDC (Mainnet)</option>
            </select>
          </div>
          {tokenLoading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <p>{tokenFormatted} {tokenSymbol}</p>
              <p className="text-xs text-gray-500">Token: {tokenName as string}</p>
            </div>
          )}
        </div>
      </div>

      {/* TRANSACTION FORMS */}
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

        <div>
          <label className="block text-sm font-medium mb-1">Spender Address (for approve)</label>
          <input
            type="text"
            value={spenderAddress}
            onChange={(e) => setSpenderAddress(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 border rounded"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={handleSendEth}
            disabled={isSendingEth || !recipient || !amount}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            {isSendingEth ? "Sending..." : "Send ETH"}
          </button>
          
          <button
            onClick={handleTransferToken}
            disabled={isTransferring || !recipient || !amount}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {isTransferring ? "Transferring..." : "Transfer Token"}
          </button>
          
          <button
            onClick={handleApproveToken}
            disabled={isApproving || !spenderAddress || !amount}
            className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
          >
            {isApproving ? "Approving..." : "Approve Token"}
          </button>
        </div>
      </div>

      {/* TRANSACTION STATUS */}
      <div className="space-y-2">
        {ethHash && (
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-sm font-medium">ETH Transfer</p>
            <p className="text-xs font-mono">{ethHash}</p>
            {ethReceipt && <p className="text-sm text-green-600">✓ Confirmed</p>}
          </div>
        )}

        {transferHash && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm font-medium">Token Transfer</p>
            <p className="text-xs font-mono">{transferHash}</p>
            {transferReceipt && <p className="text-sm text-blue-600">✓ Confirmed</p>}
          </div>
        )}

        {approveHash && (
          <div className="p-3 bg-purple-50 border border-purple-200 rounded">
            <p className="text-sm font-medium">Token Approval</p>
            <p className="text-xs font-mono">{approveHash}</p>
            {approveReceipt && <p className="text-sm text-purple-600">✓ Confirmed</p>}
          </div>
        )}
      </div>

      {/* CODE EXAMPLES */}
      <div className="p-4 bg-gray-50 rounded">
        <h4 className="font-medium mb-2">How to use this in your code:</h4>
        <pre className="text-xs overflow-x-auto">
{`// Get balances
const { balance, formatted, symbol } = useBalance(address);
const { balance: tokenBalance } = useERC20Balance(tokenAddress);

// Send transactions
const { sendEth } = useSendEth();
const { transfer } = useERC20Transfer(tokenAddress);
const { approve } = useERC20Approve(tokenAddress);

// Network switching
const { switchToChain } = useNetwork();

// Wait for confirmations
const { data: receipt } = useTransactionReceipt(hash);`}
        </pre>
      </div>
    </div>
  );
}