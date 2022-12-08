import {useState} from 'react';
import axios from 'api/axios';

const axiosConfig = { withCredentials: true };

function useToken() {

	const [accessToken, setAccessToken] = useState(null);

  const refreshToken = async (user) => {
    const res = await axios.post('refresh-token', { id: user.id }, axiosConfig);
    setAccessToken(res.data.accessToken);
    return res.data.accessToken;
  };

	return {accessToken, setAccessToken, refreshToken};
}

export default useToken;