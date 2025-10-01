"use client";

import { useAuth } from '@/contexts/AuthContext'
import { useAccount } from 'wagmi'

export function AuthStatus() {
  const { session, isAuthenticated, isLoading, signIn, signOut, error } = useAuth()
  const { isConnected, address } = useAccount()

  if (!isConnected) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <h3 className="font-medium mb-2">Authentication Status</h3>
        <p className="text-sm text-gray-600">Connect your wallet to authenticate</p>
      </div>
    )
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-medium mb-3">Authentication Status</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Wallet:</span>
          <span className="text-sm font-mono">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Authenticated:</span>
          <span className={`text-sm font-medium ${isAuthenticated ? 'text-green-600' : 'text-red-600'}`}>
            {isAuthenticated ? '✓ Yes' : '✗ No'}
          </span>
        </div>

        {session && (
          <div className="text-xs text-gray-500">
            <p>Session expires: {session.expiresAt.toLocaleString()}</p>
          </div>
        )}

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <div className="pt-2">
          {isAuthenticated ? (
            <button
              onClick={signOut}
              className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={signIn}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Signing In...' : 'Sign In with Ethereum'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}