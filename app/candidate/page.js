'use client';

import { useEffect, useState } from 'react';
import { connectMetaMask } from '../lib/walletConnect';
import { getContract } from '../lib/contract'; 
import Navbar from '../components/Navbar';

export default function CandidateDashboard() {
  const [myProfile, setMyProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const wallet = await connectMetaMask(); // Get wallet from MetaMask
        const { contract } = await getContract(); // Get the contract instance

        // Log the available functions to ensure getCandidateProfile exists
        console.log(contract.functions);

        // Fetch the candidate profile from the contract
        const profile = await contract.getCandidateProfile(wallet);
        
        if (profile) {
          setMyProfile({
            name: profile[0],
            bio: profile[1],
            skills: profile[2],
            image: profile[3],
            wallet,
          });
        } else {
          setMyProfile(null); // If no profile found
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-300 italic">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-semibold mb-6">Welcome to the Candidate Dashboard</h1>
        <p className="text-lg mb-4">Here you can manage your profile and view bids from companies looking for candidates like you.</p>

        {myProfile ? (
          <div className="border border-gray-300 rounded-lg p-6 bg-white text-black shadow-md max-w-xl">
            <h2 className="text-2xl font-bold mb-2">{myProfile.name}</h2>
            <p className="mb-2"><strong>Skills:</strong> {myProfile.skills}</p>
            <p><strong>Bio:</strong> {myProfile.bio}</p>
            <p><strong>Wallet:</strong> {myProfile.wallet}</p>
          </div>
        ) : (
          <p className="text-gray-300 italic">No profile found. Please create one.</p>
        )}
      </div>
    </div>
  );
}
