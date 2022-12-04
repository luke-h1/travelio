import { withAuthentication } from '@frontend/utils/api-middlewares/withAuthentication';
import { withMethods } from '@frontend/utils/api-middlewares/withMethods';
import { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require('cloudinary').v2;

async function handler(_req: NextApiRequest, res: NextApiResponse) {
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
}
export default withMethods(['POST'], withAuthentication(handler));
