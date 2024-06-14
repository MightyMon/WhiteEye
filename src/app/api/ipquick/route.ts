import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await prisma.ipquick.findMany();
    
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
