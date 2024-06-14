import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
// var ping = require('ping');
// async function checkIfActive(ip: string): Promise<boolean> {
//   try {
//     const { alive } = await ping.sys.probe(ip); // Use destructuring for clarity
//     return alive;
//   } catch (error) {
//     console.error(`Error pinging ${ip}:`, error);
//     return false; // Assume inactive on error
//   }
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { ip } = req.query; // Assuming IP is sent as a query parameter

//   if (!ip || typeof ip !== 'string') {
//     return res.status(400).json({ error: 'Missing or invalid IP address' });
//   }

//   try {
//     const isActive = await checkIfActive(ip);
//     res.status(200).json({ isActive });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error checking IP activity' });
//   }
// }



// export async function GET() {
//   return NextResponse.json({
//     hello: "world"
// })
// }

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'This is a GET request' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
