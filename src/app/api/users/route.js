import { PrismaClient } from "@prisma/client";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route'; // Adjust the import path as needed


const prisma = new PrismaClient();

export async function GET(request) {
  try {
    console.log('Attempting to fetch users...');
    // Note: getServerSession in App Router route handlers only needs the request object
    const session = await getServerSession(authOptions);
    console.log('Session in /api/users:', session);

    if (!session) {
      console.log('No session found. Returning 401.');
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    console.log('Session user role:', session.user?.role);
    if (session.user?.role !== 'ADMIN') {
      console.log('User is not ADMIN. Returning 401.');
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }
    console.log('Session in /api/users:', session);

    if (!session) {
      console.log('No session found. Returning 401.');
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    console.log('Session user role:', session.user.role);
    if (session.user.role !== 'ADMIN') {
      console.log('User is not ADMIN. Returning 401.');
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    console.log('User is ADMIN. Proceeding to fetch users.');
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), { status: 500 });
  }
}
