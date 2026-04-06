// Prisma seed for database initialization
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create demo user
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      username: 'demo',
      password: await bcrypt.hash('demo123', 10),
      displayName: 'Demo User',
      status: 'online',
    },
  });

  console.log('✓ User created:', user.email);

  // Create demo workspace
  const workspace = await prisma.workspace.create({
    data: {
      name: 'Demo Workspace',
      description: 'Welcome to Emergent!',
      slug: 'demo-workspace',
      members: {
        create: {
          userId: user.id,
          role: 'owner',
        },
      },
    },
  });

  console.log('✓ Workspace created:', workspace.name);

  // Create demo channels
  const generalChannel = await prisma.channel.create({
    data: {
      workspaceId: workspace.id,
      name: 'general',
      description: 'General discussion',
      slug: 'general',
      members: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  console.log('✓ Channel created:', generalChannel.name);

  // Create welcome message
  const welcomeMessage = await prisma.message.create({
    data: {
      channelId: generalChannel.id,
      userId: user.id,
      content: '# Welcome to Emergent! 🚀\n\nThis is a private messenger for developers.',
      type: 'text',
    },
  });

  console.log('✓ Welcome message created');
  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
