import { useToast } from '@chakra-ui/toast';
import useAsync from '@educt/hooks/useAsync';
import { useRootStore } from '@educt/hooks/useRootStore';
import { IUser } from '@educt/interfaces';
import { FetchUsersParamsType } from '@educt/types';
import { useErrorHandler } from 'react-error-boundary';

type DeletedUserDataType = IUser;

const useDeleteUser = () => {
  const { userStore } = useRootStore();
  const toast = useToast();
  const handleError = useErrorHandler();

  const deleteUser = async (id: string, paramsContext?: FetchUsersParamsType | undefined) => {
    try {
      const result = await userStore.deleteUser(id, paramsContext);
      toast({ title: 'User deleted.', status: 'info' });
      return result.data;
    } catch (error: any) {
      if (error.response) {
        toast({ title: error.message, status: 'error' });
      } else {
        handleError(error);
      }

      return Promise.reject(error);
    }
  };

  const { execute, ...state } = useAsync<DeletedUserDataType, Parameters<typeof deleteUser>>(deleteUser);

  return { deleteUser: execute, ...state };
};

export { useDeleteUser };
