import { useMe } from '@frontend/hooks/useMe';
import { useRouter } from 'next/router';
import { ComponentType } from 'react';

const withAuth = (
  WrappedComponent: ComponentType,
  redirectPath = '/auth/login',
) => {
  const AuthRedirectWrapper = (props = {}) => {
    const router = useRouter();
    const { user } = useMe();

    if (!user) {
      router.push(redirectPath);
      return null;
    }
    return <WrappedComponent {...props} />;
  };
  return AuthRedirectWrapper;
};
export default withAuth;
