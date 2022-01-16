import { useToast } from '@chakra-ui/react';
import { IToken } from '@educt/interfaces';
import { useErrorHandler } from 'react-error-boundary';
import useAsync from '../../useAsync';
import { useRootStore } from '../../useRootStore';

type LoginResultDataType = IToken;

const useLogin = () => {
  const { authStore } = useRootStore();
  const toast = useToast();
  const handleError = useErrorHandler();

  const login = async (login: string, password: string) => {
    try {
      const result = await authStore.login(login, password);
      toast({
        title: `👋 Welcome back!`,
        description: 'You are successfully logged in.',
        isClosable: true,
        status: 'success',
      });
      return result.data;
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            toast({ title: 'User not found in a system.', status: 'error', duration: 2000 });
            break;
          case 401:
            toast({ title: 'Invalid password.', status: 'error', duration: 2000 });
            break;
          default:
            handleError(error);
            break;
        }
      } else {
        handleError(error);
      }

      return Promise.reject(error);
    }
  };

  const { execute, ...state } = useAsync<LoginResultDataType, Parameters<typeof login>>(login);

  return { login: execute, ...state };
};

export { useLogin };