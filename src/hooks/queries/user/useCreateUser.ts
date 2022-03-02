import { useErrorHandler } from 'react-error-boundary';
import { CreateUserParamsType, FetchUsersParamsType } from '@educt/types';
import { useRootStore } from '@educt/hooks/useRootStore';
import { useToast } from '@chakra-ui/toast';
import { IUser } from '@educt/interfaces';
import useAsync from '@educt/hooks/useAsync';

type CreatedUserDataType = IUser;

const useCreateUser = () => {
  const { userStore } = useRootStore();
  const toast = useToast();
  const handleError = useErrorHandler();

  const createUser = async (data: CreateUserParamsType, paramsContext?: FetchUsersParamsType | undefined) => {
    try {
      const result = await userStore.createUser(data, paramsContext);
      toast({ title: 'User created.', status: 'info' });
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

  const { execute, ...state } = useAsync<CreatedUserDataType, Parameters<typeof createUser>>(createUser);

  return { createUser: execute, ...state };
};

export { useCreateUser };
