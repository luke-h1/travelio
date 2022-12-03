import HolidayCard from '@frontend/components/HolidayCard/HolidayCard';
import Page from '@frontend/components/Page/Page';
import withAuth from '@frontend/hocs/withAuth';
import { useMounted } from '@frontend/hooks/useMounted';
import { validateToken } from '@frontend/utils/auth';
import prisma from '@frontend/utils/prisma';
import { Holiday } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

interface Props {
  holidays?: Holiday[];
}

const Home: NextPage<Props> = ({ holidays }) => {
  const { isMounted } = useMounted();

  return isMounted ? (
    <Page>
      <h1>Home</h1>
      {holidays && holidays.length > 0 ? (
        holidays.map(hol => <HolidayCard holiday={hol} key={hol.id} />)
      ) : (
        <div>
          <h2>No holidays. Go create or take some!</h2>
          <Link href="/holidays/new">Create new holiday</Link>
        </div>
      )}
    </Page>
  ) : null;
};

export default withAuth(Home);

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  let user;

  try {
    user = validateToken(ctx.req.cookies.TRAVELIO_ACCESS_TOKEN as string);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login',
      },
    };
  }

  const holidays = await prisma.holiday.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      startDate: 'asc',
    },
  });

  return {
    props: {
      holidays,
    },
  };
};
