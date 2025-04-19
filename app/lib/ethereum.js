// lib/ethereum.js
import { ethers } from 'ethers';

const YOUR_RPC_URL = 'https://YOUR_ETHEREUM_RPC_URL';  // Replace with your Ethereum RPC URL
const CONTRACT_ADDRESS = '0xYourContractAddress';  // Replace with your deployed contract address
const CONTRACT_ABI = [/* Your contract ABI here */];  // Replace with your contract's ABI

export async function getContract() {
  try {
    const provider = new ethers.JsonRpcProvider(YOUR_RPC_URL);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    console.log('Contract initialized:', contract);
    return contract;
  } catch (err) {
    console.error('Error initializing contract:', err);
    throw new Error('Could not initialize contract');
  }
}
