import { useToast } from '@chakra-ui/toast';
import { ISentCodeResult } from 'interfaces';
import { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import useIsMountedRef from './useIsMountedRef';
import { useRootStore } from './useRootStore';

type UpdateUserEmailStateType = {
  result: ISentCodeResult | null;
  error: any;
  loading: boolean;
  fetched: boolean;
};

const useUpdateUserEmailQuery = () => {
  const isMountedRef = useIsMountedRef();
  const { userStore } = useRootStore();
  const [state, setState] = useState<UpdateUserEmailStateType>({
    result: null,
    error: null,
    loading: false,
    fetched: false,
  });
  const toast = useToast();
  const handleError = useErrorHandler();

  const sendConfirmationCode = async (email: string) => {
    try {
      setState(s => ({ ...s, loading: true }));
      const result = await userStore.updateCurrentUserEmail(email);
      toast({ title: 'Confirmation code has been sent.', status: 'info' });

      if (isMountedRef.current) {
        setState(s => ({ ...s, result }));
      }

      return result;
    } catch (error: any) {
      if (isMountedRef.current) {
        setState(s => ({ ...s, error }));
      }

      if (error.response) {
        switch (error.response.status) {
          case 503:
            toast({ title: 'Service unavailable. Please, try later again.', status: 'error' });
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

  return { ...state, sendConfirmationCode };
};

export default useUpdateUserEmailQuery;
