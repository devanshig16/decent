//candidate/home/page.js
'use client';

import { useEffect, useState } from 'react';
import { getAllCandidateProfiles } from '../../lib/tableland_storage';
import Navbar from '../../components/Navbar';

export default function Home() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getAllCandidateProfiles();
        setProfiles(data);
      } catch (err) {
        console.error('Error loading profiles:', err);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-semibold mb-6">Browse Other Candidate Profiles</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile, idx) => (
            <div key={idx} className="border border-gray-300 rounded-lg p-4">
              <img
                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${profile.wallet}`}
                alt="Candidate"
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-sm text-gray-600">{profile.skills}</p>
              <p className="text-sm mt-2">Bio: {profile.bio}</p>
              <p className="text-xs mt-2 text-gray-500">Wallet: {profile.wallet}</p>
              <button className="bg-indigo-600 text-white py-2 px-6 rounded-lg mt-4">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
