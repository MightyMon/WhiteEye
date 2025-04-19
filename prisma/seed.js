import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10); // Hash a default password

  const user = await prisma.user.upsert({
    where: { email: 'testuser@example.com' }, // Find user by email
    update: {
      role: 'ADMIN', // Update role to ADMIN if user exists
    },
    create: {
      name: 'testuser', // Create user if they don't exist
      email: 'testuser@example.com',
      password: hashedPassword,
      role: 'ADMIN', // Set role to ADMIN on creation
    },
  });
  console.log(`Upserted user with id: ${user.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });