import { makeApiResponse } from '@frontend/types/util';
import { withAuthentication } from '@frontend/utils/api-middlewares/withAuthentication';
import { withMethods } from '@frontend/utils/api-middlewares/withMethods';
import prisma from '@frontend/utils/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  const id = req.query.id as string;

  const exists = await prisma.holiday.findFirst({
    where: {
      id,
      AND: {
        userId: session?.user?.id,
      },
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

  await prisma.holiday.delete({
    where: {
      id: exists?.id as string,
    },
  });

  res.status(200).json(makeApiResponse(null, []));
}

export default withMethods(['DELETE'], withAuthentication(handler));
