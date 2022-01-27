import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { useRootStore } from '../../useRootStore';
import { useErrorHandler } from 'react-error-boundary';
import useAsync from '../../useAsync';
import { useContext } from 'react';

/**
 * Contexts
 */
import { SocketContext } from '@educt/contexts';

type LogoutResultDataType = Record<string, never>;

const useLogout = () => {
  const { authStore } = useRootStore();
  const { socket } = useContext(SocketContext);
  const history = useHistory();
  const toast = useToast();
  const handleError = useErrorHandler();

  const logout = async () => {
    try {
      const result = await authStore.logout();
      history.push('/auth');
      toast({ title: 'You are logged out.', isClosable: true, status: 'info' });
      // window.localStorage.removeItem('sessionId');
      socket?.disconnect();
      return result.data;
    } catch (error) {
      handleError(error);
      return Promise.reject(error);
    }
  };

  const { execute, ...state } = useAsync<LogoutResultDataType, Parameters<typeof logout>>(logout);

  return { logout: execute, ...state };
};

export { useLogout };
