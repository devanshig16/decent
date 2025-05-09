import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 shadow-md">
      <div className="text-2xl font-bold text-white">
        <Link href="/">
          <span className="hover:text-green-400 transition duration-200">Simple Platform</span>
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <Link href="/candidate">
          <span className="hover:text-green-400 transition duration-200">Candidate Dashboard</span>
        </Link>
        <Link href="/candidate/profile">
          <span className="hover:text-green-400 transition duration-200">Candidate Profile</span>
        </Link>
        <Link href="/company">
          <span className="hover:text-green-400 transition duration-200">Company Dashboard</span>
        </Link>
        <Link href="/company/profile">
          <span className="hover:text-green-400 transition duration-200">Company Profile</span>
        </Link>
      </div>
    </nav>
  );
}
