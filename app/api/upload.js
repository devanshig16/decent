import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const file = req.files.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const formData = new FormData();
      formData.append('file', file.data, file.name);

      const pinataApiKey = process.env.PINATA_API_KEY;
      const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;

      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          maxContentLength: 'Infinity',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${pinataApiKey}`,
          },
        }
      );

      const ipfsHash = response.data.IpfsHash;
      return res.status(200).json({ IpfsHash: ipfsHash });
    } catch (err) {
      console.error('Error uploading to Pinata:', err);
      return res.status(500).json({ error: 'Error uploading file to IPFS' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
