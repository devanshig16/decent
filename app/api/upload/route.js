import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import pinataSDK from '@pinata/sdk';

const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const form = new formidable.IncomingForm();
    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const file = data.files.file;
    const readableStreamForFile = fs.createReadStream(file.filepath);

    const result = await pinata.pinFileToIPFS(readableStreamForFile);
    return NextResponse.json({ IpfsHash: result.IpfsHash });
  } catch (error) {
    console.error('API Upload Error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
