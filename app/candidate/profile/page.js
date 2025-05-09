'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar'; // Make sure you import the Navbar if it's not already.

export default function Profile() {
  const [form, setForm] = useState({ name: '', bio: '', skills: '', image: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile saved (simulated).');
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Create Your Profile</h1>
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

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-lg transition"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
