import Page from '@frontend/components/Page';
import { deleteHoliday } from '@frontend/utils/mutations';
import prisma from '@frontend/utils/prisma';
import { Holiday, User } from '@prisma/client';
import { format, parseISO } from 'date-fns';
import { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
  const session = useSession();
  const router = useRouter();

  return (
    <Page>
      <article>
        {holiday.image && (
          <Image
            src={holiday.image}
            blurDataURL={holiday.image}
            width={410}
            height={230}
            alt={holiday.title}
          />
        )}
        <section>
          <h2>{holiday?.title}</h2>
          <p>
            {holiday.city} / {holiday.country}
          </p>
          <p>
            Added by{' '}
            {holiday.userId === session?.data?.user?.id
              ? 'you'
              : holiday.user.firstName}
          </p>
          <p>
            {`${format(parseISO(holiday.startDate), 'MMMM d, yyyy')} - ${format(
              parseISO(holiday.endDate),
              'MMMM d, yyyy',
            )}`}
          </p>
          <div>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href={`https://www.google.com/maps/place/${holiday.city}+${holiday.country}`}
            >
              View on google maps
            </a>
          </div>
        </section>
        {holiday.notes && <p>{holiday.notes}</p>}

        {holiday.userId === session?.data?.user?.id && (
          <section>
            <Link href={`/holidays/edit/${holiday.id}`}>
              <button type="button" className="btn btn-secondary">
                Edit
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-primary"
              // eslint-disable-next-line no-console
              onClick={async () => {
                const res = await deleteHoliday(holiday.id);
                if (res.data === null) {
                  router.push('/holidays');
                }
              }}
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
