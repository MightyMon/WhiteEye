import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route'; // Corrected import path

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    console.log('Session in /api/users/create:', session);

    if (!session) {
      console.log('No session found. Returning 401.');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    console.log('Session user role in /api/users/create:', session.user?.role);
    if (session.user?.role !== 'ADMIN') {
      console.log('User is not ADMIN. Returning 401.');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    console.log('User is ADMIN. Proceeding to create user.');

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { email, password, name, role } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || "NORMAL", // Default to NORMAL if role is not provided
      },
    });

    return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
  }
}