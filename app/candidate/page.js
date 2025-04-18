//app/candidate/page.js
// app/candidate/page.js
'use client';

import { useEffect, useState } from 'react';
import { connectMetaMask } from '../lib/walletConnect';
import { getAllCandidateProfiles } from '../lib/tableland_storage';
import Navbar from '../components/Navbar';

export default function CandidateDashboard() {
  const [myProfile, setMyProfile] = useState(null);

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const wallet = await connectMetaMask();
        const allProfiles = await getAllCandidateProfiles();
        const profile = allProfiles.find((p) => p.wallet === wallet);
        setMyProfile(profile);
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };

    fetchMyProfile();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-semibold mb-6">Welcome to the Candidate Dashboard</h1>
        <p className="text-lg mb-4">Here you can manage your profile and view bids from companies looking for candidates like you.</p>

        {myProfile ? (
          <div className="border border-gray-300 rounded-lg p-6 bg-white text-black shadow-md max-w-xl">
            {myProfile.image && (
              <img
                src={myProfile.image}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
            )}
            <h2 className="text-2xl font-bold mb-2">{myProfile.name}</h2>
            <p className="mb-2"><strong>Skills:</strong> {myProfile.skills}</p>
            <p><strong>Bio:</strong> {myProfile.bio}</p>
          </div>
        ) : (
          <p className="text-gray-300 italic">Loading your profile...</p>
        )}
      </div>
    </div>
  );
}

