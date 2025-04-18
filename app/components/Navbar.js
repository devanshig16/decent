import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 shadow-md">
        <div className="text-2xl font-bold text-white"><Link href="/">
            <span className="hover:text-green-400 transition duration-200">BlockSupply</span>
          </Link></div>
        <div className="flex items-center space-x-6">
          <Link href="/candidate">
            <span className="hover:text-green-400 transition duration-200">Dashboard</span>
          </Link>
          <Link href="/candidate/profile">
            <span className="hover:text-green-400 transition duration-200">Profile</span>
          </Link>
          <Link href="/candidate/home">
            <span className="hover:text-green-400 transition duration-200">Browse</span>
          </Link>
        </div>
      </nav>
    
  );
}
