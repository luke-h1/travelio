import { validateRoute } from '@frontend/utils/auth';
import prisma from '@frontend/utils/prisma';
import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default validateRoute(
  async (_req: NextApiRequest, res: NextApiResponse, user) => {
    const u = await prisma.user.findUnique({
      where: {
        id: (user as User).id,
      },
    });

    if (!u) {
      res.status(401).json({
        user: null,
        error: 'Not authorized',
      });
      return;
    }

    const hols = await prisma.holiday.findMany({
      where: {
        userId: (user as User).id,
      },
    });

    res.status(200).json({
      ...(user as User),
      hols,
    });
  },
);
