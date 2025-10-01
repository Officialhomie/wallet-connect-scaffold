import { env } from './env'

export interface SiweSession {
  address: string
  chainId: number
  message: string
  signature: string
  expiresAt: Date
}

export interface SiweMessageData {
  domain: string
  address: string
  statement: string
  uri: string
  version: string
  chainId: number
  nonce: string
  expirationTime: string
}

export function createSiweMessage(options: {
  address: string
  chainId: number
  nonce: string
  domain?: string
  uri?: string
  statement?: string
}): { prepareMessage: () => string; data: SiweMessageData } {
  const domain = options.domain || new URL(env.appUrl).host
  const uri = options.uri || env.appUrl
  const statement = options.statement || `Sign in to ${env.appName}`
  const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  
  const data: SiweMessageData = {
    domain,
    address: options.address,
    statement,
    uri,
    version: '1',
    chainId: options.chainId,
    nonce: options.nonce,
    expirationTime,
  }

  const prepareMessage = () => {
    return `${data.domain} wants you to sign in with your Ethereum account:
${data.address}

${data.statement}

URI: ${data.uri}
Version: ${data.version}
Chain ID: ${data.chainId}
Nonce: ${data.nonce}
Issued At: ${new Date().toISOString()}
Expiration Time: ${data.expirationTime}`
  }

  return { prepareMessage, data }
}

export function generateNonce(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function createSession(
  address: string,
  chainId: number,
  message: string,
  signature: string
): SiweSession {
  return {
    address,
    chainId,
    message,
    signature,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  }
}

export function isSessionValid(session: SiweSession | null): boolean {
  if (!session) return false
  return new Date() < session.expiresAt
}