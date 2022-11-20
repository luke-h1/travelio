/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { holidays, users } from './data';

const prisma = new PrismaClient({});

const run = async () => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash('password', salt);

  await Promise.all(
    users.map(async user => {
      const u = await prisma.user.upsert({
        create: {
          ...user,
          password,
        },
        update: {
          ...user,
          password,
        },
        where: {
          email: user.email,
        },
      });

      console.log(`Created user ${u.id}`);
    }),
  );

  await Promise.all(
    holidays.map(async holiday => {
      const user = await prisma.user.findUnique({
        where: {
          email: users[0].email,
        },
      });

      const hol = await prisma.holiday.create({
        data: {
          ...holiday,
          userId: user?.id as string,
        },
      });

      console.log(`Created holiday ${hol.id}`);
    }),
  );
};

run()
  .catch(e => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
