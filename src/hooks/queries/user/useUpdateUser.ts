import { useErrorHandler } from 'react-error-boundary';
import { useToast } from '@chakra-ui/toast';
import { useRootStore } from '@educt/hooks/useRootStore';
import { UpdateUserParamsType } from '@educt/types';
import { IUser } from '@educt/interfaces';
import useAsync from '@educt/hooks/useAsync';

type UpdatedUserDataType = IUser;

const useUpdateUser = () => {
  const { userStore } = useRootStore();
  const toast = useToast();
  const handleError = useErrorHandler();

  const updateUser = async (id: string, params: UpdateUserParamsType) => {
    try {
      const result = await userStore.updateUser(id, params);
      toast({ title: 'User updated.', status: 'info' });
      return result.data;
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 422:
            toast({ title: `${error.response.data.errors[0].message}`, status: 'error' });
            break;
          default:
            toast({ title: `${error.message}`, status: 'error' });
            break;
        }
      } else {
        handleError(error);
      }

      return Promise.reject(error);
    }
  };

  const { execute, ...state } = useAsync<UpdatedUserDataType, Parameters<typeof updateUser>>(updateUser);

  return { updateUser: execute, ...state };
};

export { useUpdateUser };
