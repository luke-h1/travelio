/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from './prisma';

export const validateRoute = (
  handler: (
    req: NextApiRequest,
    res: NextApiResponse,
    ...args: unknown[]
  ) => void,
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { TRAVELIO_ACCESS_TOKEN: token } = req.cookies;

    if (token) {
      let user: User | null;

      try {
        const { id } = jwt.verify(token, 'hi') as JwtPayload;
        user = await prisma.user.findUnique({
          where: {
            id,
          },
        });

        if (!user) {
          throw new Error('Not real user');
        }
      } catch (e) {
        res.status(401).json({
          error: 'Not authorized',
        });
        // eslint-disable-next-line no-useless-return
        return;
      }
      // eslint-disable-next-line consistent-return
      return handler(req, res, user);
    }
    res.status(401).json({
      error: 'Not authorized',
    });
  };
};

export const validateToken = (token: string) => {
  const user = jwt.verify(token, 'hi') as JwtPayload;
  return user;
};
