import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const users = await prisma.ipquick.findMany();
//     // No need to cast to unknown type, return data directly
//     return NextResponse.json(users);
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     // You can also return an error response with appropriate status code
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }
export const IPFetch = {
    getIPFetchData: async () => {
      const aliveIP = await prisma.ipquick.findMany();
      return aliveIP;
    }
  }