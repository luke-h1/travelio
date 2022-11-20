/* eslint-disable no-case-declarations */
import { makeApiResponse } from '@frontend/types/util';
import { validateRoute } from '@frontend/utils/auth';
import prisma from '@frontend/utils/prisma';
import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user) => {
    switch (req.method) {
      case 'POST':
        const hol = await prisma.holiday.create({
          data: {
            ...req.body,
            userId: (user as User).id,
          },
        });

        res.status(201).json(makeApiResponse(hol, []));

        break;

      case 'PUT':
        const id = req.body.id as string;

        const exists = await prisma.holiday.findFirst({
          where: {
            id,
          },
        });

        if (!exists) {
          const response = makeApiResponse(null, [
            {
              field: 'title',
              message: "Holiday doesn't exist",
            },
          ]);
          res.status(404).json(response);
        }

        const updatedHol = await prisma.holiday.update({
          where: {
            id,
          },
          data: {
            ...req.body,
          },
        });
        res.status(200).json(makeApiResponse(updatedHol, []));
        break;

      case 'DELETE':
        const holId = req.body.id as string;

        await prisma.holiday.delete({
          where: {
            id: holId,
          },
        });
        res.status(200).json(makeApiResponse(null, []));

        break;

      default:
        break;
    }
  },
);
