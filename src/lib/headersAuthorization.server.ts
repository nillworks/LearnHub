import 'server-only';
import { getTokenServer } from './getTokenServer';

const headersAuthorization = async () => {
  const token = await getTokenServer();

  return {
    authorization: `Bearer ${token}`,
  };
};

export default headersAuthorization;