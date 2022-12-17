import { Holiday } from '@prisma/client';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

interface Props {
  holiday: Holiday;
}

const HolidayCard = ({ holiday }: Props) => {
  return (
    <Link href={`/holidays/${holiday.id}`}>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg" src={holiday.image} alt={holiday.title} />
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {holiday.city} / {holiday.country}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {holiday.notes}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {`${format(parseISO(holiday.startDate), 'MMMM d, yyyy')} - ${format(
              parseISO(holiday.endDate),
              'MMMM d, yyyy',
            )}`}{' '}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HolidayCard;
