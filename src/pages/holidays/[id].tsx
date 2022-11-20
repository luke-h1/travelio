import prisma from '@frontend/utils/prisma';
import { Holiday } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';

interface Props {
  holiday?: Holiday;
}

const HolidayPage: NextPage<Props> = ({ holiday }) => {
  return (
    <div>
      <h1>Holiday {holiday?.id}</h1>
    </div>
  );
};

export default HolidayPage;

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const { id } = ctx.query;
  const holiday = await prisma.holiday.findUnique({
    where: {
      id: id as string,
    },
  });

  if (!holiday) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      holiday,
    },
  };
};
