import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import useUsers from '../hooks/user/useUsers';
import PageContainer from 'layout/PageContainer';

const columns = [
  { field: 'firstName', headerName: 'First name' },
  { field: 'lastName', headerName: 'Last name' },
  { field: 'email', headerName: 'Email' },
  { field: 'roles', headerName: 'Roles' },
];

function Users() {
  const { users, status } = useUsers();

  if (status === 'loading') return 'loading...';
  // TODO: use different approach to use the div:height:400
  return (
    <PageContainer>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          getRowId={(user) => user._id}
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </PageContainer>
  );
}

export default Users;
