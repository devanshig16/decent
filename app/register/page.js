'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { connectMetaMask } from '../lib/walletConnect';
import { getContract } from '../lib/contract';

export default function RegisterPage() {
  const [role, setRole] = useState('');
  const [wallet, setWallet] = useState('');
  const router = useRouter();

  // Fetch wallet from MetaMask if it's not already set
  useEffect(() => {
    const fetchWalletFromMetaMask = async () => {
      const currentWallet = await connectMetaMask(); // Fetch the connected wallet
      setWallet(currentWallet);
    };

    // If no wallet is set, fetch it from MetaMask
    if (!wallet) {
      fetchWalletFromMetaMask();
    }
  }, [wallet]);

  const registerUser = async (role) => {
    const { contract, signer } = await getContract();
    const address = wallet; // Use the wallet address here

    const currentRole = await contract.getRole(address);
    // 0 = None, 1 = Candidate, 2 = Company
    if (currentRole.toString() !== '0') {
      console.log('🛑 User already registered. Role:', currentRole.toString());
      alert('You are already registered.');
      return;
    }

    if (role === 'candidate') {
      const tx = await contract.registerAsCandidate();
      await tx.wait();
    } else if (role === 'company') {
      const tx = await contract.registerAsCompany();
      await tx.wait();
    }
  };

  const handleSubmit = async () => {
    if (!wallet) {
      alert("Please connect your wallet.");
      return;
    }

    try {
      await registerUser(role);

      if (role === 'company') {
        router.push('/company');
      } else if (role === 'candidate') {
        router.push('/candidate');
      }
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Register</h1>
        <p className="text-gray-600 mb-4">Choose your role to continue</p>

        <select
          onChange={(e) => setRole(e.target.value)}
          value={role}
          className="w-full border border-gray-300 rounded-md p-3 mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select your role</option>
          <option value="company">Company</option>
          <option value="candidate">Candidate</option>
        </select>

        <button
          onClick={handleSubmit}
          disabled={!role}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
