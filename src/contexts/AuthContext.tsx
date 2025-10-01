"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useAccount, useSignMessage, useChainId } from 'wagmi'
import { generateNonce, createSiweMessage, createSession, isSessionValid, type SiweSession } from '@/lib/siwe'

interface AuthContextType {
  session: SiweSession | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: () => Promise<void>
  signOut: () => void
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SiweSession | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { signMessageAsync } = useSignMessage()

  // Load session from localStorage on mount
  useEffect(() => {
    const storedSession = localStorage.getItem('siwe-session')
    if (storedSession) {
      try {
        const parsedSession: SiweSession = JSON.parse(storedSession)
        parsedSession.expiresAt = new Date(parsedSession.expiresAt)
        
        if (isSessionValid(parsedSession)) {
          setSession(parsedSession)
        } else {
          localStorage.removeItem('siwe-session')
        }
      } catch {
        localStorage.removeItem('siwe-session')
      }
    }
  }, [])

  // Clear session when wallet disconnects
  useEffect(() => {
    if (!isConnected) {
      setSession(null)
      localStorage.removeItem('siwe-session')
    }
  }, [isConnected])

  const signIn = async () => {
    if (!address || !isConnected) {
      setError('Please connect your wallet first')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const nonce = generateNonce()
      const message = createSiweMessage({
        address,
        chainId,
        nonce,
      })

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })

      const newSession = createSession(
        address,
        chainId,
        message.prepareMessage(),
        signature
      )

      setSession(newSession)
      localStorage.setItem('siwe-session', JSON.stringify(newSession))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in')
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = () => {
    setSession(null)
    setError(null)
    localStorage.removeItem('siwe-session')
  }

  const isAuthenticated = isConnected && isSessionValid(session) && session?.address === address

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated,
        isLoading,
        signIn,
        signOut,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}