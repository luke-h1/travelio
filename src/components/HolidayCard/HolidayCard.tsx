import { Holiday } from '@prisma/client';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
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
          <a className={styles.cardLocationUrl}>View on google maps</a>
          <h3 className={styles.cardTitle}>{holiday.title}</h3>
          <p className={styles.cardDate}>
            {`${format(parseISO(holiday.startDate), 'MMMM d, yyyy')} - ${format(
              parseISO(holiday.endDate),
              'MMMM d, yyyy',
            )}`}
          </p>
          <p className={styles.cardDescription}>{holiday.notes}</p>
        </div>
      </div>
    </Link>
  );
};

export default HolidayCard;
