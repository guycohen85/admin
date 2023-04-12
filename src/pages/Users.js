import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import useUsers from '../hooks/user/useUsers';
import PageContainer from 'layout/PageContainer';
import StripedDataGrid from 'components/StripedDataGrid';
import { ThemeContext } from '@emotion/react';
import { palette } from '@mui/system';

const columns = [
  { field: 'firstName', headerName: 'First name', flex: 1 },
  { field: 'lastName', headerName: 'Last name', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'roles', headerName: 'Roles', flex: 1 },
];

function Users() {
  const { users, status } = useUsers();

  if (status === 'loading') return 'loading...';
  // TODO: use different approach to use the div:height:400
  return (
    <PageContainer>
      {/* <div style={{ height: 400, width: '100%' }}>
        <DataGrid getRowId={(user) => user._id} rows={users} columns={columns} />
      </div> */}
      <div style={{ height: 400, width: '100%' }}>
        <StripedDataGrid
          // sx={{ backgroundColor: (theme) => theme.palette.primary.main }}
          getRowId={(user) => user._id}
          rows={users}
          columns={columns}
          pageSize={3}
        />
      </div>
    </PageContainer>
  );
}

export default Users;
