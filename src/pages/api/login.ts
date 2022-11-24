import { siteConfig } from '@frontend/config';
import { makeApiResponse } from '@frontend/types/util';
import prisma from '@frontend/utils/prisma';
import bcrypt from 'bcrypt';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        time: Date.now(),
      },
      'hi',
      {
        expiresIn: '8h',
      },
    );

    res.setHeader(
      'Set-Cookie',
      cookie.serialize(siteConfig.ACCESS_TOKEN, token, {
        httpOnly: true,
        maxAge: 60 * 60 * 8, // 8 hours
        path: '/',
        secure: process.env.NODE_ENV !== 'development',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      }),
    );

    const response = makeApiResponse(user, []);
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
