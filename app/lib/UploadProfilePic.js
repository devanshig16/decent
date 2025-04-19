'use client';

import React, { useState } from 'react';
import { uploadFileToIPFS } from '../lib/uploadToIPFS'; // Import the new function

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
    try {
      const url = await uploadFileToIPFS(file); // Use the new IPFS upload function
      setIpfsUrl(url);
      onUploadComplete(url); // Notify parent component with the IPFS URL
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
