import { comparePassword } from '@frontend/utils/auth';
import prisma from '@frontend/utils/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),
    providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: 'email', type: 'text', placeholder: 'jsmith' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          // prisma get user by mail
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });

          if (!user) {
            throw new Error('No user found!');
          }

          const isValid = await comparePassword(
            credentials?.password as string,
            user.password,
          );

          if (!isValid) {
            throw new Error('Could not log you in!');
          }
          // eslint-disable-next-line no-console
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return {
              id: user.id,
              email: user.email,
              name: `${user.firstName} ${user.lastName}`,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
            };
          }
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        },
      }),
    ],
    callbacks: {
      session: async ({ session, token }) => {
        if (session?.user?.name) {
          // eslint-disable-next-line no-param-reassign
          session.user.id = token.sub as string;
        }
        return session;
      },
    },
    secret: process.env.SECRET,
    session: {
      // jwt: true,
      strategy: 'jwt',
      maxAge: 30 * 24 * 60 * 60, // 30 days * 2
      updateAge: 24 * 60 * 60, // 24 hours
    },
    useSecureCookies: process.env.NODE_ENV === 'production',
    debug: process.env.NODE_ENV === 'development',
  });
}
