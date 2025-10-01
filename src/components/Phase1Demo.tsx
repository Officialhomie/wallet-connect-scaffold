"use client";

import { useAppKit } from '@reown/appkit/react'
import { useAccount, useDisconnect } from 'wagmi'
import { useAuth } from '@/contexts/AuthContext'
import { AuthStatus } from './AuthStatus'

export function Phase1Demo() {
  const { open } = useAppKit()
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()
  const { isAuthenticated } = useAuth()

  return (
    <div className="space-y-6 p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Phase 1: Next-Gen WalletConnect Features
        </h2>
        <p className="text-gray-600">
          AppKit + Social Login + SIWE Authentication
        </p>
      </div>

      {/* Connection Status */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg border">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Wallet Connection
          </h3>
          
          {isConnected ? (
            <div className="space-y-3">
              <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                {address}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => open()}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  Account Modal
                </button>
                <button
                  onClick={() => disconnect()}
                  className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                >
                  Disconnect
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-600 text-sm">No wallet connected</p>
              <button
                onClick={() => open()}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded font-medium hover:from-blue-700 hover:to-purple-700"
              >
                Connect Wallet
              </button>
              <div className="text-xs text-gray-500 space-y-1">
                <p>✨ Supports social login (Google, Apple, Discord)</p>
                <p>🔗 All wallet types (Browser, Mobile, WalletConnect)</p>
                <p>📧 Email login with embedded wallets</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white rounded-lg border">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isAuthenticated ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
            Authentication
          </h3>
          <AuthStatus />
        </div>
      </div>

      {/* Features Demo */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg border">
          <h4 className="font-medium mb-2">🚀 AppKit Features</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Professional UI components</li>
            <li>• Multi-connector support</li>
            <li>• Auto wallet detection</li>
            <li>• Mobile optimized</li>
          </ul>
        </div>

        <div className="p-4 bg-white rounded-lg border">
          <h4 className="font-medium mb-2">🔑 Social Login</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Google authentication</li>
            <li>• Apple ID integration</li>
            <li>• Discord login</li>
            <li>• Embedded wallets</li>
          </ul>
        </div>

        <div className="p-4 bg-white rounded-lg border">
          <h4 className="font-medium mb-2">🔐 SIWE Auth</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Secure signature-based auth</li>
            <li>• Session management</li>
            <li>• One-click sign in</li>
            <li>• Cross-tab persistence</li>
          </ul>
        </div>
      </div>

      {/* Implementation Code Example */}
      <div className="p-4 bg-gray-900 text-gray-100 rounded-lg text-sm overflow-x-auto">
        <h4 className="text-white font-medium mb-2">Implementation Example:</h4>
        <pre>{`// Connect with AppKit
const { open } = useAppKit()
open() // Opens modal with all options

// Authenticate with SIWE
const { signIn, isAuthenticated } = useAuth()
await signIn() // Signs message & creates session

// Check auth status
if (isAuthenticated) {
  // User is verified ✓
}`}</pre>
      </div>

      {/* Phase 2 Preview */}
      <div className="p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border-2 border-dashed border-green-300">
        <h4 className="font-medium mb-2 text-green-800">🚀 Coming in Phase 2:</h4>
        <div className="grid md:grid-cols-2 gap-2 text-sm text-green-700">
          <div>
            <p>💳 Fiat Onramp - Buy crypto with credit cards</p>
            <p>🔄 Token Swaps - Built-in DEX trading</p>
          </div>
          <div>
            <p>🧠 Smart Accounts - Programmable wallets</p>
            <p>⚡ Smart Sessions - Persistent connections</p>
          </div>
        </div>
      </div>
    </div>
  )
}