import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export function withAuthentication(handler: NextApiHandler) {
  // eslint-disable-next-line func-names
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) {
      return res.status(403).end();
    }

    return handler(req, res);
  };
}
