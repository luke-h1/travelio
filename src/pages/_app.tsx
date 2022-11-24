import '../styles/global.scss';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Analytics />
      <Component {...pageProps} />{' '}
    </>
  );
}

export default App;
