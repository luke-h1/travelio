import Page from '@frontend/components/Page/Page';
import { useSession } from 'next-auth/react';

const ProfilePage = () => {
  const { data } = useSession();
  return (
    <Page>
      <h1>Profile</h1>
      <p>{data?.user?.email}</p>
    </Page>
  );
};

export default ProfilePage;
