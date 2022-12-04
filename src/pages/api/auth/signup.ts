import { makeApiResponse } from '@frontend/types/util';
import prisma from '@frontend/utils/prisma';
import bcrypt from 'bcrypt';
import omit from 'lodash/omit';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line consistent-return
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return;
  }
  const {
    username,
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation,
    bio,
  } = req.body;

  if (password !== passwordConfirmation) {
    res.status(400).json({
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
        name: `${firstName} ${lastName}`,
        username,
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

  const response = makeApiResponse(omit(user, 'password'), []);
  res.status(200).json(response);
};
