import '../styles/global.scss';
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Analytics />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default App;
