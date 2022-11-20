import { useMe } from '@frontend/hooks/useMe';

const ProfilePage = () => {
  const { user } = useMe();
  return (
    <div>
      <h1>Profile</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default ProfilePage;
