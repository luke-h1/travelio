import { siteConfig } from '@frontend/config';
import { makeApiResponse } from '@frontend/types/util';
import prisma from '@frontend/utils/prisma';
import bcrypt from 'bcrypt';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line consistent-return
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName, email, password, passwordConfirmation, bio } =
    req.body;

  if (password !== passwordConfirmation) {
    return res.status(400).json({
      errors: [
        {
          message: 'Passwords do not match',
          path: 'passwordConfirmation',
        },
      ],
    });
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  let user;

  try {
    user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        bio,
      },
    });
  } catch (e) {
    res.status(401);
    res.json({
      errors: [
        {
          field: 'email',
          message: 'User already exists',
        },
      ],
    });
  }

  const token = jwt.sign(
    {
      email: user?.email,
      id: user?.id,
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
};
