/* eslint-disable consistent-return */
// middleware for protected pages that require auth

import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from './config';

const protectedPages = [
  '/home',
  'holiday',
  'holidays/[id]',
  '/user/[id]',
  '/profile',
] as const;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function middleware(req: NextRequest) {
  if (protectedPages.find(page => page === req.nextUrl.pathname)) {
    const token = req.cookies.get(siteConfig.ACCESS_TOKEN);

    if (!token) {
      // direct to the auth login page
      return NextResponse.redirect('/auth/login');
    }
  }
}
