import { useReadContract, useWriteContract } from "wagmi";

export function useContractRead(config: {
  address: `0x${string}`;
  abi: unknown[];
  functionName: string;
  args?: unknown[];
  chainId?: number;
}) {
  return useReadContract({
    address: config.address,
    abi: config.abi,
    functionName: config.functionName,
    args: config.args,
    chainId: config.chainId,
  });
}

export function useContractWrite() {
  return useWriteContract();
}