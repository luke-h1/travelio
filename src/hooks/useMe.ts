import fetcher from '@frontend/utils/fetcher';
import { User } from '@prisma/client';
import useSWR from 'swr';

export const useMe = () => {
  const { data, error } = useSWR<User, unknown>('/me', fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
