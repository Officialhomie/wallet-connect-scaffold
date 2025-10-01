const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId && typeof window !== "undefined") {
  console.warn("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is required. Get one at https://cloud.walletconnect.com");
}

export const env = {
  projectId: projectId || "",
  appName: process.env.NEXT_PUBLIC_APP_NAME || "WalletConnect Scaffold",
  appDescription: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "A modern WalletConnect integration",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  enableTestnets: process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true",
};