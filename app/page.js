'use client';

import { useRouter } from 'next/navigation';
import { connectMetaMask } from './lib/walletConnect';
import { getContract } from './lib/contract';

export default function Home() {
  const router = useRouter();

  const handleEnterPlatform = async () => {
    try {
      const wallet = await connectMetaMask();
      const { contract } = await getContract();

      // Log the wallet address for debugging
      console.log(`🧑‍💻 Wallet connected: ${wallet}`);

      const role = await contract.getRole(wallet);
      const roleNum = role.toString();

      // Log the detected role for debugging
      console.log(`🧠 Detected role for wallet ${wallet}: ${roleNum}`);

      // Redirect based on the detected role
      if (roleNum === '1') {
        console.log('Redirecting to Candidate dashboard');
        router.push('/candidate');
      } else if (roleNum === '2') {
        console.log('Redirecting to Company dashboard');
        router.push('/company');
      } else {
        console.log('Redirecting to Register page');
        router.push(`/register?wallet=${wallet}`);
      }
    } catch (err) {
      console.error("❌ Error accessing MetaMask or contract:", err);
      alert('Failed to connect. Make sure MetaMask is installed and connected.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 space-y-8">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center leading-tight">
        Welcome to the Decentralized Hiring Platform
      </h1>
      <button
        onClick={handleEnterPlatform}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-4 px-10 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out text-xl"
      >
        Enter Platform
      </button>
    </div>
  );
}
