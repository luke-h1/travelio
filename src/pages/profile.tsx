import Page from '@frontend/components/Page/Page';
import prisma from '@frontend/utils/prisma';
import { User } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

interface Props {
  user: User;
}

const ProfilePage = ({ user }: Props) => {
  return (
    <Page>
      <h1>
        {user.name} ({user.email})
      </h1>
    </Page>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const session = await getSession();

  const user = await prisma.user.findFirst({
    where: {
      id: session?.user?.id as string,
    },
  });

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};
