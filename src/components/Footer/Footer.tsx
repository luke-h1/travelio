import { FaPlaneDeparture } from 'react-icons/fa';
import SocialList from '../SocialList/SocialList';
import styles from './Footer.module.scss';
import FooterLinks from './FooterLinks';

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.contentFooter}>
        <div className={styles.presentation}>
          <FaPlaneDeparture fontSize="29.5px" />
          <SocialList />
        </div>
        <div className={styles.menuFooter}>
          <FooterLinks />
        </div>
      </div>

      <p className={styles.aboutFooter}>
        MIT {new Date().getFullYear()}, Built with Next.js
      </p>
    </footer>
  );
};

export default Footer;
