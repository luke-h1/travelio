import prisma from '@frontend/utils/prisma';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';

const useMe = async () => {
  const { data } = await useSession();

  const user = await prisma.user.findFirst({
    where: {
      id: data?.user?.id,
    },
  });

  return user as User;
};
export default useMe;
