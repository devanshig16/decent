'use client';

import React, { useState } from 'react';

const UploadProfilePic = ({ onUploadComplete }) => {
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result); // base64 image
      onUploadComplete(reader.result); // send to parent
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && (
        <div>
          <p className="text-green-600">Uploaded:</p>
          <img src={previewUrl} alt="Profile" className="w-32 h-32 object-cover rounded-full mt-2" />
        </div>
      )}
    </div>
  );
};

export default UploadProfilePic;
