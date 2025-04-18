'use client';

import React, { useState } from 'react';
import axios from 'axios';

const UploadProfilePic = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [ipfsUrl, setIpfsUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        maxContentLength: 'Infinity',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: ` Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkMzY3MGUzNS02OTZkLTQ4YjUtODIwNy1kOWIwNDEyMjI4OGIiLCJlbWFpbCI6ImR2c2ZvcmdlNUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYzJiMmIxZjQwYjJiMGQ1Mjc4MjQiLCJzY29wZWRLZXlTZWNyZXQiOiJkMzlhNWJkNTAxMDQ1MDY3MmE2OWUyMjZlZDc0NjljODA5OThlMDM1NTljOGRhMjZhMzkyOWMxNzBhNTQ5ZjA4IiwiZXhwIjoxNzc2NDgwNjYxfQ.B8jLcLYgTzP9ePnpyEyRdsa1iMwfnna_eDXoAYk6DHE`, // Replace with your JWT from Pinata
        },
      });

      const hash = res.data.IpfsHash;
      const url = `https://gateway.pinata.cloud/ipfs/${hash}`;
      setIpfsUrl(url);
      onUploadComplete(url); // Send IPFS URL to parent
    } catch (err) {
      console.error('Error uploading to Pinata:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading} className="bg-blue-600 text-white px-4 py-1 rounded">
        {uploading ? 'Uploading...' : 'Upload to IPFS'}
      </button>
      {ipfsUrl && (
        <div>
          <p className="text-green-600">Uploaded:</p>
          <img src={ipfsUrl} alt="Profile" className="w-32 h-32 object-cover rounded-full mt-2" />
        </div>
      )}
    </div>
  );
};

export default UploadProfilePic;
