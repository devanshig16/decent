'use client';

import { useRouter } from 'next/navigation';
import { connectMetaMask } from './lib/walletConnect';
import { getUserStatus } from './lib/tableland_storage';

export default function Home() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const wallet = await connectMetaMask();
      router.push(`/register?wallet=${wallet}`);
    } catch (err) {
      console.error("MetaMask connection failed", err);
    }
  };

  const handleRegistered = async () => {
    try {
      const wallet = await connectMetaMask();
      const role = await getUserStatus(wallet);

      if (role === 'company') {
        router.push('/company');
      } else if (role === 'candidate') {
        router.push('/candidate');
      } else {
        alert('You are not registered yet.');
      }
    } catch (err) {
      console.error("Error checking user status:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 space-y-8">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center leading-tight">
        Welcome to the Decentralized Hiring Platform
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Login with MetaMask
        </button>
        <button
          onClick={handleRegistered}
          className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          I am Registered
        </button>
      </div>
    </div>
  );
}
