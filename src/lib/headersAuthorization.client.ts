import { authClient } from './auth-client';

const headersAuthorization = async () => {
  const { data } = await authClient.token();

  return {
    authorization: `Bearer ${data?.token || ''}`,
  };
};

export default headersAuthorization;