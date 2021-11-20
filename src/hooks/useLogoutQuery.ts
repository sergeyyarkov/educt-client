import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { useRootStore } from './useRootStore';
import { useErrorHandler } from 'react-error-boundary';
import useAsync from './useAsync';

const useLogoutQuery = () => {
  const { authStore } = useRootStore();
  const history = useHistory();
  const toast = useToast();
  const handleError = useErrorHandler();

  const logout = async () => {
    try {
      await authStore.logout();
      history.push('/auth');
      toast({ title: 'You are logged out.', isClosable: true, status: 'info' });
    } catch (error) {
      handleError(error);
    }
  };

  const { execute, ...state } = useAsync<void, Parameters<typeof logout>>(logout);

  return { logout: execute, ...state };
};

export default useLogoutQuery;
