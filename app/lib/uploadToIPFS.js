// /lib/uploadToIPFS.js
import FormData from 'form-data';

export async function uploadFileToIPFS(file) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`, // or use API Key/Secret if not using JWT
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Failed to upload file to IPFS');
  }

  const data = await res.json();
  return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
}
