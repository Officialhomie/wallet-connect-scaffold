"use client";

import { useAppKit } from '@reown/appkit/react'
import { useAccount, useDisconnect } from 'wagmi'

export function AppKitButton() {
  const { open } = useAppKit()
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div className="flex flex-col gap-4 items-center">
        <p className="text-sm font-mono">
          Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => open()}
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm h-10 px-6"
          >
            Account
          </button>
          <button
            onClick={() => disconnect()}
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm h-10 px-6"
          >
            Disconnect
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => open()}
      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm h-10 px-6"
    >
      Connect Wallet
    </button>
  )
}