import Hero from '@frontend/components/Hero/Hero';
import Page from '@frontend/components/Page/Page';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Page>
      <Hero />
    </Page>
  );
};

export default Home;
