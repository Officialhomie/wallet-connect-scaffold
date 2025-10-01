import { useSwitchChain, useChainId } from "wagmi";
import { getChain } from "@/lib/chains";

export function useNetwork() {
  const chainId = useChainId();
  const { switchChain, isPending, error } = useSwitchChain();

  const currentChain = getChain(chainId);

  const switchToChain = (targetChainId: number) => {
    if (chainId !== targetChainId) {
      switchChain({ chainId: targetChainId });
    }
  };

  return {
    chainId,
    currentChain,
    switchToChain,
    isSwitching: isPending,
    error,
  };
}