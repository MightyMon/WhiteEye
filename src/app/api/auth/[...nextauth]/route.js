import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const authOptions = { // Export authOptions
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Attempting to authorize user...');
        console.log('Credentials received:', credentials);

        if (!credentials) {
          console.log('No credentials provided.');
          return null;
        }

        try {
          console.log('Attempting to find user in database with email:', credentials.username);
          const user = await prisma.user.findUnique({
            where: { email: credentials.username },
          });
          console.log('Prisma findUnique result:', user);

          if (user && bcrypt.compareSync(credentials.password, user.password)) {
            console.log('User found and password matches. Authorization successful.');
            return { id: user.id, name: user.name, email: user.email, role: user.role }; // Include role
          } else {
            console.log('User not found or password does not match.');
            return null;
          }
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT callback - user:', user);
      console.log('JWT callback - initial token:', token);
      if (user) {
        token.id = user.id;
        token.role = user.role; // Add role to token
        console.log('Added role to token:', user.role);
      }
      console.log('JWT callback - final token:', token);
      return token;
    },
    async session({ session, token }) {
      console.log('Session callback - initial session:', session);
      console.log('Session callback - token:', token);
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role; // Add role to session
        console.log('Copied role from token to session:', token.role);
      } else {
        console.warn('No token available in session callback');
      }
      console.log('Session callback - final session:', session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions); // Pass authOptions to NextAuth

export const auth = handler;
export { handler as GET, handler as POST };