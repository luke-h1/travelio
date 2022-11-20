import { useMe } from '@frontend/hooks/useMe';
import { useRouter } from 'next/router';
import { ComponentType } from 'react';

const withAdmin = (WrappedComponent: ComponentType, redirectPath = '/') => {
  const AuthRedirectWrapper = (props = {}) => {
    const router = useRouter();
    const { user, isLoading } = useMe();

    if (!isLoading && user?.role !== 'ADMIN') {
      router.push(redirectPath);
      return null;
    }
    return <WrappedComponent {...props} />;
  };
  return AuthRedirectWrapper;
};
export default withAdmin;
