import bcrypt from 'bcryptjs';
import prisma from '../services/prismaService.js';

async function seedTestUser() {
  try {
    const hashedPassword = await bcrypt.hash('test123456', 10);
    
    const existingUser = await prisma.user.findUnique({
      where: { email: 'demo@culturelens.ai' }
    });

    if (existingUser) {
      console.log('✅ Test user already exists');
      return;
    }

    const user = await prisma.user.create({
      data: {
        email: 'demo@culturelens.ai',
        password: hashedPassword,
        name: 'Demo User'
      }
    });

    console.log('✅ Test user created successfully');
    console.log('Email:', user.email);
    console.log('Password: test123456');
  } catch (error) {
    console.error('❌ Error creating test user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedTestUser();
