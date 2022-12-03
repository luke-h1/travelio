import { withAuth } from 'next-auth/middleware';
import { getSession } from './utils/getSession';

export default withAuth({
  callbacks: {
    async authorized({ req }) {
      const session = await getSession(req.headers.get('cookie') as string);
      return !!session;
    },
  },
});
export const config = {
  matcher: [
    '/holidays/new',
    '/holidays',
    '/users/:path*', // any user path
    '/home',
    '/profile',
    '/admin/:path*', // any admin path
  ],
};
