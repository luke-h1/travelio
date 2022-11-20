import { AiFillGithub } from 'react-icons/ai';
import styles from './SocialList.module.scss';

const SocialList = () => {
  const iconSize = 21;

  return (
    <ul className={styles.socialMedia}>
      <li>
        <a
          href="https://github.com/luke-h1"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Link to my Github profile"
        >
          <AiFillGithub size={iconSize} />
        </a>
        <span className={styles.socialName}>Github</span>
      </li>
    </ul>
  );
};

export default SocialList;
