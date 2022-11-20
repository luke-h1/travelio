import Link from 'next/link';
import styles from './Footer.module.scss';

const links: { id: number; name: string; slug: string }[] = [
  {
    id: 1,
    name: 'Home',
    slug: '/home',
  },
  {
    id: 2,
    name: 'Profile',
    slug: '/',
  },
  {
    id: 3,
    name: 'Holidays',
    slug: '/holidays',
  },
];

const FooterLinks = () => {
  return (
    <ul className={styles.pageList}>
      {links &&
        links.map(link => (
          <li key={link.id}>
            <Link href={link.slug} legacyBehavior>
              {link.name}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default FooterLinks;
