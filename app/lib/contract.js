// /app/lib/contract.js
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0x2f073d292509f106Bef97FD38F1C82978A49059B';

const CONTRACT_ABI = [
  "function registerAsCandidate() public",
  "function registerAsCompany() public",
  "function getRole(address user) public view returns (uint8)",
  "function setCandidateProfile(string name, string bio, string skills, string image) public",
  "function getCandidateProfile(address user) public view returns (string name, string bio, string skills, string image, bool exists)"
];

export async function getContract() {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask is not available');
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    return { contract, signer }; // return both
  } catch (err) {
    console.error('Error in getContract:', err);
    throw new Error('Error in contract connection');
  }
}

