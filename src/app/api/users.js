// pages/api/users.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    return res.status(200).json([{ hello: 1 }]);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch users" });
  }
}
