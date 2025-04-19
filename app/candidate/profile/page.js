'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import UploadProfilePic from '../../lib/UploadProfilePic'; // Import the updated upload component
import { connectMetaMask } from '../../lib/walletConnect';
import { getCandidateProfile, saveCandidateProfile } from '../../lib/profileStorage';

export default function Profile() {
  const [wallet, setWallet] = useState('');
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: '', bio: '', skills: '', image: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const connectedWallet = await connectMetaMask();
        setWallet(connectedWallet);

        const userProfile = await getCandidateProfile(connectedWallet);
        if (userProfile) {
          setProfile(userProfile);
          setForm({
            name: userProfile.name,
            bio: userProfile.bio,
            skills: userProfile.skills,
            image: userProfile.image
          });
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    fetchProfile();
  }, []);

  const handleImageUpload = (url) => {
    setForm((prevForm) => ({ ...prevForm, image: url }));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image) {
      alert('Please upload a profile picture before submitting.');
      return;
    }

    try {
      setLoading(true);
      console.log('Saving profile with data:', form);
      const tx = await saveCandidateProfile(form);
      console.log('Profile saved with tx:', tx?.hash);
      alert('Profile successfully saved to the blockchain!');
    } catch (err) {
      console.error('Error saving profile:', err);
      alert('Error saving profile. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">
          {profile ? 'Edit Your Profile' : 'Create Your Profile'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-lg font-medium">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="4"
              required
            />
          </div>

          <div>
            <label htmlFor="skills" className="block text-lg font-medium">Skills</label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Profile Picture</label>
            <UploadProfilePic onUploadComplete={handleImageUpload} />
            {form.image && (
              <img
                src={form.image}
                alt="Profile"
                className="mt-4 w-32 h-32 object-cover rounded-full"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-lg transition"
          >
            {loading ? 'Saving...' : profile ? 'Update Profile' : 'Create Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
