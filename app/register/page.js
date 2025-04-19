'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { connectMetaMask } from '../lib/walletConnect';
import { getContract } from '../lib/contract';

export default function RegisterPage() {
  const [role, setRole] = useState('');
  const [wallet, setWallet] = useState('');
  const [currentRole, setCurrentRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const init = async () => {
      // Get wallet address from URL query parameter or from MetaMask connection
      const walletFromQuery = searchParams.get('wallet');
      const connectedWallet = walletFromQuery || await connectMetaMask();
      setWallet(connectedWallet);

      // Fetch contract and check the role of the wallet
      const { contract } = await getContract();
      const roleFromContract = await contract.getRole(connectedWallet);
      console.log("🔍 Current role from contract:", roleFromContract.toString());
      setCurrentRole(roleFromContract.toString());
      setLoading(false);
    };

    init();
  }, [searchParams]);

  // Function to register user based on the selected role
  const registerUser = async (selectedRole) => {
    const { contract } = await getContract();

    if (selectedRole === 'candidate') {
      const tx = await contract.registerAsCandidate();
      await tx.wait();
    } else if (selectedRole === 'company') {
      const tx = await contract.registerAsCompany();
      await tx.wait();
    }
  };

  // Handle the submit action for registration
  const handleSubmit = async () => {
    if (!wallet) {
      alert("Please connect your wallet.");
      return;
    }

    try {
      // Register the user and redirect based on the role
      await registerUser(role);

      if (role === 'company') {
        router.push('/company');
      } else if (role === 'candidate') {
        router.push('/candidate');
      }
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed. Please check the console for details.');
    }
  };

  // If the page is still loading (checking the role), show loading message
  if (loading) {
    return <div className="text-center mt-10 text-white">Checking registration status...</div>;
  }

  // If the user is already registered (role is not '0'), show a message and redirect
  if (currentRole !== '0') {
    return (
      <div className="text-center mt-10 text-white">
        You are already registered. Redirecting...
      </div>
    );
  }

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
