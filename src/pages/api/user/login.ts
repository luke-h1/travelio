import { makeApiResponse } from '@frontend/types/util';
import prisma from '@frontend/utils/prisma';
import bcrypt from 'bcrypt';
import omit from 'lodash/omit';

import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user && bcrypt.compareSync(password, user.password)) {
    const response = makeApiResponse(omit(user, 'password'), []);
    res.status(200).json(response);
  } else {
    res.status(401).json({
      errors: [
        {
          message: 'Invalid email or password',
          field: 'email',
        },
      ],
    });
  }
};
