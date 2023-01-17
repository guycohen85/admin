import React, { useEffect } from 'react';
import { api } from '../api/api';

function Protected() {
  useEffect(() => {
    api.post('protected');
  }, []);

  return <h1>Protected</h1>;
}

export default Protected;
