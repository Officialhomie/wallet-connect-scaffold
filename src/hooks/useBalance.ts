import { useBalance as useWagmiBalance } from "wagmi";

export function useBalance(address?: `0x${string}`) {
  const { data, isLoading, isError, refetch } = useWagmiBalance({
    address,
  });

  return {
    balance: data?.value,
    formatted: data ? parseFloat(data.formatted).toFixed(4) : "0",
    symbol: data?.symbol || "ETH",
    isLoading,
    isError,
    refetch,
  };
}


