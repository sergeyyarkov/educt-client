import React from 'react';
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { useRootStore } from './useRootStore';
import { IDataResult } from 'interfaces';
import { useErrorHandler } from 'react-error-boundary';

type StateType = {
  result: IDataResult | null;
  error: any;
  loading: boolean;
  fetched: boolean;
};

const useLogoutQuery = () => {
  const { authStore } = useRootStore();
  const [state, setState] = React.useState<StateType>({ result: null, error: null, loading: false, fetched: false });
  const isMounted = React.useRef(true);
  const history = useHistory();
  const toast = useToast();
  const handleError = useErrorHandler();
  const request = React.useCallback(async () => {
    setState(s => ({ ...s, loading: true }));
    try {
      const data = await authStore.logout();
      history.push('/auth');

      toast({ title: 'You are logged out.', isClosable: true, status: 'info' });
      if (isMounted.current) setState(s => ({ ...s, result: data }));
    } catch (error) {
      handleError(error);
      setState(s => ({ ...s, error }));
    } finally {
      if (isMounted.current) setState(s => ({ ...s, loading: false, fetched: true }));
    }
  }, [authStore, history, toast, handleError]);

  const logout = () => request();

  React.useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return { ...state, logout };
};

export default useLogoutQuery;
