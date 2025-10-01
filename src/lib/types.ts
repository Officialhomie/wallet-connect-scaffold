import type { Address, Hash, Hex } from "viem";

export interface ContractConfig {
  address: Address;
  abi: readonly unknown[];
  chainId?: number;
}

export interface TransactionOptions {
  value?: bigint;
  gas?: bigint;
  gasPrice?: bigint;
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
}

export interface TransactionResult {
  hash: Hash;
  receipt?: {
    blockHash: Hash;
    blockNumber: bigint;
    gasUsed: bigint;
    status: "success" | "reverted";
    transactionHash: Hash;
  };
}

export interface ContractWriteResult extends TransactionResult {
  functionName: string;
  args: readonly unknown[];
}

export interface TokenInfo {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  chainId: number;
}

export interface BalanceInfo {
  value: bigint;
  decimals: number;
  symbol: string;
  formatted: string;
}

export type ContractEventLog = {
  address: Address;
  blockHash: Hash;
  blockNumber: bigint;
  data: Hex;
  logIndex: number;
  topics: readonly [signature: Hex, ...args: Hex[]];
  transactionHash: Hash;
  transactionIndex: number;
};

export interface WriteContractErrorType extends Error {
  cause?: {
    code?: number;
    message?: string;
  };
  details?: string;
}

export interface ReadContractErrorType extends Error {
  cause?: {
    code?: number;
    message?: string;
  };
  details?: string;
}