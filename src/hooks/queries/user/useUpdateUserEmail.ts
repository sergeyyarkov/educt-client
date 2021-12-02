import { useToast } from '@chakra-ui/toast';
import { useErrorHandler } from 'react-error-boundary';
import { useRootStore } from '@educt/hooks/useRootStore';
import useAsync from '@educt/hooks/useAsync';

type ConfirmationResultDataType = { expired_seconds: number } | null;

const useUpdateUserEmail = () => {
  const { userStore } = useRootStore();
  const toast = useToast();
  const handleError = useErrorHandler();

  const sendConfirmationCode = async (email: string) => {
    try {
      const result = await userStore.updateCurrentUserEmail(email);
      toast({ title: 'Confirmation code has been sent.', status: 'info' });
      return result.data;
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 503) {
          switch (error.response.data.code) {
            case 'E_CONFIRM_CODE_EXIST':
              toast({ title: 'Please, try send code later.', status: 'info' });
              break;
            default:
              toast({ title: `Unable to send confirmation code, try again later.`, status: 'error' });
              break;
          }
        } else if (error.response.status === 422) {
          toast({ title: error.response.data.errors[0].message, status: 'error' });
        } else {
          handleError(error);
        }
      } else {
        handleError(error);
      }

      return Promise.reject(error);
    }
  };

  const { execute, ...state } = useAsync<ConfirmationResultDataType, Parameters<typeof sendConfirmationCode>>(
    sendConfirmationCode
  );

  return { sendConfirmationCode: execute, ...state };
};

export { useUpdateUserEmail };
