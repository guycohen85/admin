import React, { useEffect } from 'react';
import { api } from '../services/api';
import PageContainer from 'layout/PageContainer';

function Protected() {
  useEffect(() => {
    api.post('protected');
  }, []);

  return (
    <PageContainer>
      <h1>Protected</h1>
    </PageContainer>
  );
}

export default Protected;
