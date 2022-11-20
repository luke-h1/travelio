import { useMe } from '@frontend/hooks/useMe';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Header.module.scss';

const authLinks = [
  { name: 'Hols', path: '/holidays' },
  { name: 'Profile', path: '/profile' },
];

const noAuthLinks = [
  { name: 'Register', path: '/auth/register' },
  { name: 'Login', path: '/auth/login' },
];

const Header = (): JSX.Element => {
  const router = useRouter();
  const { isLoading, user } = useMe();
  const pathname = router.pathname.split('/[')[0]; // active paths on dynamic subpages
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/blur.png"
              alt="blur"
              layout="fixed"
              width="45"
              height="45"
              priority
              placeholder="blur"
              blurDataURL="/blur.png"
            />
          </Link>
          <nav className={styles.nav}>
            <ol className={styles.links}>
              {user && user.id && !isLoading
                ? authLinks.map(({ name, path }) => (
                    <li
                      key={path}
                      className={
                        pathname === path
                          ? classNames(styles.link, styles.linkActive)
                          : styles.link
                      }
                    >
                      <Link href={path}>{name}</Link>
                    </li>
                  ))
                : noAuthLinks.map(({ name, path }) => (
                    <li
                      key={path}
                      className={
                        pathname === path
                          ? classNames(styles.link, styles.linkActive)
                          : styles.link
                      }
                    >
                      <Link href={path}>{name}</Link>
                    </li>
                  ))}
            </ol>
          </nav>
        </div>
      </header>
      <div className={styles.spacer} />
    </>
  );
};

export default Header;
