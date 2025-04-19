import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function CandidateDashboard() {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-semibold mb-6">Welcome to the Candidate Dashboard</h1>
        <p className="text-lg mb-4">Here you can manage your profile and view bids from companies looking for candidates like you.</p>
        
        <div className="space-y-4">
          <Link href="/candidate/profile">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-lg transition">
              Go to Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
