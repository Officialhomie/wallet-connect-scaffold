import { AppKitButton } from "@/components/AppKitButton";
import { Phase1Demo } from "@/components/Phase1Demo";
import { CompleteExample } from "@/components/CompleteExample";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            WalletConnect Scaffold
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Next-Generation WalletConnect with AppKit, Social Login & SIWE Auth
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex justify-center">
            <AppKitButton />
          </div>

          <Phase1Demo />
          
          <CompleteExample />
        </div>

        <footer className="mt-20 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Built with Next.js, WalletConnect, Wagmi, and Tailwind CSS
          </p>
        </footer>
      </main>
    </div>
  );
}
