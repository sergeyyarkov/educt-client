import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { useRootStore } from './useRootStore';
import { IApiRespose } from 'interfaces';
import { useErrorHandler } from 'react-error-boundary';
import useIsMountedRef from './useIsMountedRef';

type LogoutStateType = {
  result: IApiRespose<{}> | null;
  error: any;
  loading: boolean;
  fetched: boolean;
};

const useLogoutQuery = () => {
  const { authStore } = useRootStore();
  const [state, setState] = useState<LogoutStateType>({ result: null, error: null, loading: false, fetched: false });
  const isMountedRef = useIsMountedRef();
  const history = useHistory();
  const toast = useToast();
  const handleError = useErrorHandler();

  const logout = async () => {
    setState(s => ({ ...s, loading: true }));
    try {
      const data = await authStore.logout();
      history.push('/auth');

      toast({ title: 'You are logged out.', isClosable: true, status: 'info' });
      if (isMountedRef.current) {
        setState(s => ({ ...s, result: data }));
      }
    } catch (error) {
      if (isMountedRef.current) {
        setState(s => ({ ...s, error }));
      }
      handleError(error);
    } finally {
      if (isMountedRef.current) {
        setState(s => ({ ...s, loading: false, fetched: true }));
      }
    }
  };

  return { ...state, logout };
};

export default useLogoutQuery;
