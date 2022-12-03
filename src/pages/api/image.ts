import { validateRoute } from '@frontend/utils/auth';
import { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require('cloudinary').v2;

export default validateRoute(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_req: NextApiRequest, res: NextApiResponse) => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature: string = cloudinary.utils.api_sign_request(
      {
        timestamp,
      },
      process.env.CLOUDINARY_SECRET,
    );

    return res.status(201).json({
      timestamp,
      signature,
    });
  },
);
