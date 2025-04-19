// /app/lib/walletConnect.js

export async function connectMetaMask() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts[0]; // Return the first wallet address
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      throw new Error('Failed to connect to MetaMask');
    }
  } else {
    throw new Error('MetaMask is not installed');
  }
}
