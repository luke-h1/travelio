import { ReactNode } from 'react';
import Header from '../Header/Header';
import PageTransition from '../PageTransition/PageTransition';
import styles from './Page.module.scss';

interface Props {
  children: ReactNode;
}

const Page = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
};
export default Page;
