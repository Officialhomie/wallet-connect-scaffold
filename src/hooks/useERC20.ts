import { useAccount } from "wagmi";
import { formatUnits, parseUnits } from "viem";
import { useContractRead, useContractWrite } from "./useContract";

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
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint8" }],
  },
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ type: "address", name: "owner" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      { type: "address", name: "to" },
      { type: "uint256", name: "amount" },
    ],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { type: "address", name: "spender" },
      { type: "uint256", name: "amount" },
    ],
    outputs: [{ type: "bool" }],
  },
];

export function useERC20Balance(tokenAddress: `0x${string}`, userAddress?: `0x${string}`) {
  const { address } = useAccount();
  const owner = userAddress || address;

  const { data: balance, isLoading, error } = useContractRead({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: owner ? [owner] : undefined,
  });

  const { data: decimals } = useContractRead({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "decimals",
  });

  const { data: symbol } = useContractRead({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "symbol",
  });

  const formatted = balance && decimals 
    ? formatUnits(balance as bigint, decimals as number)
    : "0";

  return {
    balance: balance as bigint | undefined,
    formatted,
    symbol: symbol as string | undefined,
    decimals: decimals as number | undefined,
    isLoading,
    error,
  };
}

export function useERC20Transfer(tokenAddress: `0x${string}`) {
  const { writeContract, ...rest } = useContractWrite();

  const transfer = (to: `0x${string}`, amount: string, decimals: number) => {
    const value = parseUnits(amount, decimals);
    writeContract({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: "transfer",
      args: [to, value],
    });
  };

  return { transfer, ...rest };
}

export function useERC20Approve(tokenAddress: `0x${string}`) {
  const { writeContract, ...rest } = useContractWrite();

  const approve = (spender: `0x${string}`, amount: string, decimals: number) => {
    const value = parseUnits(amount, decimals);
    writeContract({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: "approve",
      args: [spender, value],
    });
  };

  return { approve, ...rest };
}