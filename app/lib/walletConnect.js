// /app/lib/walletConnect.js

export async function connectMetaMask() {
  if (typeof window !== 'undefined' && window.ethereum) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
  } else {
    throw new Error('MetaMask is not installed');
  }
}
