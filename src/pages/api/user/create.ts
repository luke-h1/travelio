import { withMethods } from '@frontend/utils/api-middlewares/withMethods';
import prisma from '@frontend/utils/prisma';
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line consistent-return
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
        username,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        bio,
      },
    });

    res.status(201).json(user);
  } catch (e) {
    res.status(401).json({
      errors: [
        {
          field: 'email',
          message: 'User already exists',
        },
      ],
    });
  }
};
export default withMethods(['POST'], handler);
