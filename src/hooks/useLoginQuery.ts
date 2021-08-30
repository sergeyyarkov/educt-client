import { useToast } from '@chakra-ui/react';
import { ILoginResult } from 'interfaces';
import { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import useIsMountedRef from './useIsMountedRef';
import { useRootStore } from './useRootStore';

type LoginStateType = {
  result: ILoginResult | null;
  error: any;
  loading: boolean;
  fetched: boolean;
};

const useLoginQuery = () => {
  const isMountedRef = useIsMountedRef();
  const { authStore } = useRootStore();
  const [state, setState] = useState<LoginStateType>({ result: null, error: null, loading: false, fetched: false });
  const toast = useToast();
  const handleError = useErrorHandler();

  const login = async (login: string, password: string) => {
    try {
      setState(s => ({ ...s, loading: true }));
      const result = await authStore.login(login, password);
      toast({
        title: `👋 Welcome back!`,
        description: 'You are successfully logged in.',
        isClosable: true,
        status: 'success',
      });

      if (isMountedRef.current) {
        setState(s => ({ ...s, result }));
      }
    } catch (error) {
      if (isMountedRef.current) {
        setState(s => ({ ...s, error }));
      }
      if (error.response) {
        /**
         * Handle response error
         */
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
        console.error(error);
        handleError(error);
      }
    } finally {
      if (isMountedRef.current) {
        setState(s => ({ ...s, loading: false, fetched: true }));
      }
    }
  };

  return { ...state, login };
};

export default useLoginQuery;
