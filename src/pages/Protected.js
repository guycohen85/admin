import React, { useEffect } from 'react';
import useAuthAxiosFunction from 'hooks/axios/useAxiosAuthFunction';

function Protected() {
  const [axiosAuth, response1] = useAuthAxiosFunction();

  useEffect(() => {
    axiosAuth('POST', 'protected');
  }, []);

  useEffect(() => {
    console.log(response1.data);
  }, [response1]);

  return <h1>Protected</h1>;
}

export default Protected;
