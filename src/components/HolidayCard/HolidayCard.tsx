import { Holiday } from '@prisma/client';
import Link from 'next/link';
import FormattedDate from '../FormattedDate/FormattedDate';
import styles from './HolidayCard.module.scss';

interface Props {
  holiday: Holiday;
}

const HolidayCard = ({ holiday }: Props) => {
  return (
    <Link href={`/holidays/${holiday.id}`}>
      <div className={styles.card}>
        <div className={styles.cardImg}>
          <img
            src={holiday.image as string}
            alt={holiday.title}
            className={styles.cardImg}
          />
        </div>
        <div className={styles.cardInfos}>
          <h2 className={styles.cardLocation}>
            {holiday.city} - {holiday.country}
          </h2>
          <h3 className={styles.cardTitle}>{holiday.title}</h3>
          <p className={styles.cardDate}>
            <FormattedDate>{holiday.startDate}</FormattedDate>
            <FormattedDate>{holiday.endDate}</FormattedDate>
          </p>
          <p className={styles.cardDescription}>{holiday.notes}</p>
        </div>
      </div>
    </Link>
  );
};

export default HolidayCard;
