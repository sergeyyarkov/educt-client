import { useToast } from '@chakra-ui/react';
import useAsync from '@educt/hooks/useAsync';
import { IUserInfo } from '@educt/interfaces';
import { UserServiceInstance } from '@educt/services';
import { UpdateUserInfoParamsType } from '@educt/types';
import axios from 'axios';
import { useErrorHandler } from 'react-error-boundary';

const useUpdateUserInfo = () => {
  const toast = useToast();
  const handleError = useErrorHandler();

  const fetch = async (data: UpdateUserInfoParamsType) => {
    try {
      const result = await UserServiceInstance.updateInfo(data);
      toast({ title: 'Info updated.', status: 'info' });
      return result.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 422:
              toast({ title: error.response.data.errors[0].message, status: 'error', duration: 2000 });
              break;
            default:
              handleError(error);
          }
        } else {
          handleError(error);
        }
      }

      return Promise.reject(error);
    }
  };

  const { execute, ...state } = useAsync<Partial<IUserInfo>, Parameters<typeof fetch>>(fetch);

  return { updateInfo: execute, ...state };
};

export { useUpdateUserInfo };
