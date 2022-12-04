/* eslint-disable no-case-declarations */
import { makeApiResponse } from '@frontend/types/util';
import { withAuthentication } from '@frontend/utils/api-middlewares/withAuthentication';
import { withMethods } from '@frontend/utils/api-middlewares/withMethods';
import prisma from '@frontend/utils/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  switch (req.method) {
    case 'GET':
      const holidays = await prisma.holiday.findMany({
        where: {
          userId: session?.user?.id,
        },
        take: 100,
      });

      res.status(200).json(makeApiResponse(holidays, []));
      break;

    case 'POST':
      const hol = await prisma.holiday.create({
        data: {
          ...req.body,
          userId: session?.user?.id,
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
}
export default withMethods(
  ['GET', 'POST', 'PUT', 'DELETE'],
  withAuthentication(handler),
);
