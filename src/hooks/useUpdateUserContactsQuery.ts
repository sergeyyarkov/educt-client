import { useToast } from '@chakra-ui/react';
import { IApiRespose, IUserContacts } from 'interfaces';
import { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import useIsMountedRef from './useIsMountedRef';
import { useRootStore } from './useRootStore';

type UpdateContactsStateType = {
  result: IApiRespose<{}> | null;
  error: any;
  loading: boolean;
  fetched: boolean;
};

const useUpdateUserContactsQuery = () => {
  const isMountedRef = useIsMountedRef();
  const [state, setState] = useState<UpdateContactsStateType>({
    result: null,
    error: null,
    loading: false,
    fetched: false,
  });
  const { userStore } = useRootStore();
  const toast = useToast();
  const handleError = useErrorHandler();

  const updateContacts = async (data: IUserContacts) => {
    try {
      setState(s => ({ ...s, loading: true }));
      const result = await userStore.updateCurrentUserContacts(data);
      toast({ title: `Contacts saved!`, isClosable: true, status: 'info' });

      if (isMountedRef.current) {
        setState(s => ({ ...s, result }));
      }
    } catch (error: any) {
      if (isMountedRef.current) {
        setState(s => ({ ...s, error }));
      }
      if (error.response) {
        /**
         * Catch response error
         */
        switch (error.response.status) {
          case 422:
            toast({ title: 'Validation error.', status: 'error', duration: 2000 });
            break;
          default:
            handleError(error);
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

  return { ...state, updateContacts };
};

export default useUpdateUserContactsQuery;
