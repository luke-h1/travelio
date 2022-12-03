import Page from '@frontend/components/Page/Page';
import { useMe } from '@frontend/hooks/useMe';
import prisma from '@frontend/utils/prisma';
import { Holiday, User } from '@prisma/client';
import classNames from 'classnames';
import { format, parseISO } from 'date-fns';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './HolidaySlugPage.module.scss';

interface Props {
  holiday: Holiday & {
    user: Omit<
      User,
      | 'lastName'
      | 'email'
      | 'password'
      | 'role'
      | 'bio'
      | 'createdAt'
      | 'updatedAt'
    >;
  };
}

const HolidayPage: NextPage<Props> = ({ holiday }) => {
  const { user } = useMe();
  return (
    <Page>
      <article className={styles.holidayCard}>
        {holiday.image && (
          <Image
            src={holiday.image}
            blurDataURL={holiday.image}
            width={410}
            className={styles.holidayImage}
            height={230}
            alt={holiday.title}
          />
        )}
        <section
          className={classNames('df df-fc df-ai-c', styles.holidayHeader)}
        >
          <h2>{holiday?.title}</h2>
          <p className={styles.date}>
            {holiday.city} / {holiday.country}
          </p>
          <p>
            Added by{' '}
            {holiday.userId === user?.id ? 'you' : holiday.user.firstName}
          </p>
          <p>
            {`${format(parseISO(holiday.startDate), 'MMMM d, yyyy')} - ${format(
              parseISO(holiday.endDate),
              'MMMM d, yyyy',
            )}`}
          </p>
        </section>
        {holiday.notes && <p>{holiday.notes}</p>}

        {holiday.userId === user?.id && (
          <section className={classNames('df', styles.btnGroup)}>
            <Link href={`/holidays/${holiday.id}/edit`}>
              <button type="button" className="btn btn-secondary">
                Edit
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-primary"
              // eslint-disable-next-line no-console
              onClick={() => console.log('delete')}
            >
              Delete
            </button>
          </section>
        )}
      </article>
    </Page>
  );
};

export default HolidayPage;

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const { id } = ctx.query;
  const holiday = await prisma.holiday.findUnique({
    where: {
      id: id as string,
    },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
        },
      },
    },
  });
  if (!holiday) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      holiday: JSON.parse(JSON.stringify(holiday)),
    },
  };
};
