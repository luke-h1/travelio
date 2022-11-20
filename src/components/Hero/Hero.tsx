/* eslint-disable jsx-a11y/alt-text */
import Link from 'next/link';
import styles from './Hero.module.scss';

const Hero = () => {
  return (
    <div>
      <div className={styles.navBar}>Travelio</div>
      <section className={styles.hero}>
        <img src="photo-grid.png" className={styles.heroImg} />
        <h1 className={styles.heroHeader}>
          Keep track of your favorite destinations
        </h1>
        <p className={styles.heroText}>
          Travelio is a simple app that allows you to keep track of your
          favorite destinations. Add your favorite places to your list and keep
          track of your travel plans.
        </p>
        <div className={styles.cta}>
          <p>Get started today:</p>
          <Link href="/auth/register">Register</Link>
        </div>
      </section>
    </div>
  );
};

export default Hero;
