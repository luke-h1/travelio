import Page from '@frontend/components/Page/Page';
import { useMe } from '@frontend/hooks/useMe';

const ProfilePage = () => {
  const { user } = useMe();
  return (
    <Page>
      <h1>Profile</h1>
      <p>{user?.email}</p>
    </Page>
  );
};

export default ProfilePage;
