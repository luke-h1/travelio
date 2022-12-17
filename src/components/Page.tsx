import { ReactNode } from 'react';
import Header from './Header';
import PageTransition from './PageTransition';

interface Props {
  children: ReactNode;
}

const Page = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className="container">
        <main className="main">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </>
  );
};
export default Page;
