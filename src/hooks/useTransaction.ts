import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";

export function useSendEth() {
  const { sendTransaction, data: hash, isPending, error } = useSendTransaction();

  const sendEth = (to: `0x${string}`, amount: string) => {
    sendTransaction({
      to,
      value: parseEther(amount),
    });
  };

  return {
    sendEth,
    hash,
    isPending,
    error,
  };
}

export function useTransactionReceipt(hash?: `0x${string}`) {
  return useWaitForTransactionReceipt({
    hash,
  });
}