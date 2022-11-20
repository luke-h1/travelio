import withAdmin from '@frontend/hocs/withAdmin';
import { useMe } from '@frontend/hooks/useMe';

const AdminPage = () => {
  const { user } = useMe();
  return user?.role !== 'ADMIN' ? null : (
    <div>
      <h1>Admin util page</h1>
    </div>
  );
};
export default withAdmin(AdminPage);
