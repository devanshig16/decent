'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar'; // Ensure Navbar is imported

export default function CompanyProfile() {
  const [form, setForm] = useState({ name: '', industry: '', description: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Company profile saved (simulated).');
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Create Your Company Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium">Company Name</label>
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
            <label htmlFor="industry" className="block text-lg font-medium">Industry</label>
            <input
              type="text"
              id="industry"
              name="industry"
              value={form.industry}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-medium">Company Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="4"
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
