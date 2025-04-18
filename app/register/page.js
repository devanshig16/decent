// /app/register/page.js

'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { connectMetaMask } from '../lib/walletConnect';
import { addUser } from '../lib/tableland_storage';

export default function RegisterPage() {
  const [role, setRole] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const wallet = searchParams.get('wallet');

  const handleSubmit = async () => {
    try {
      const walletAddress = wallet || await connectMetaMask(); // fallback if query param not passed
      await addUser(walletAddress, role);

      if (role === 'company') {
        router.push('/company');
      } else if (role === 'candidate') {
        router.push('/candidate');
      }
    } catch (err) {
      console.error('Registration failed:', err);
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
