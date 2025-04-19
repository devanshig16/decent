'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleEnterPlatform = (roleNum) => {
    if (roleNum === '1') {
      router.push('/candidate');
    } else if (roleNum === '2') {
      router.push('/company');
    } else {
      router.push('/register');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-indigo-700 text-white p-8 space-y-8">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center leading-tight">
        Welcome to the Simple Platform
      </h1>
      <div className="flex space-x-4">
        <button
          onClick={() => handleEnterPlatform('1')}
          className="bg-blue-200 text-white font-semibold py-4 px-10 rounded-xl shadow-lg"
        >
          Candidate
        </button>
        <button
          onClick={() => handleEnterPlatform('2')}
          className="bg-indigo-600 text-white font-semibold py-4 px-10 rounded-xl shadow-lg"
        >
          Company
        </button>
        <button
          onClick={() => handleEnterPlatform('0')}
          className="bg-green-500 text-white font-semibold py-4 px-10 rounded-xl shadow-lg"
        >
          Register
        </button>
      </div>
    </div>
  );
}
