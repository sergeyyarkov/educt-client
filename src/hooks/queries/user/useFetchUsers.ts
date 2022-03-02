import useAsync from '@educt/hooks/useAsync';
import { IUser } from '@educt/interfaces';
import { UserServiceInstance } from '@educt/services';
import { FetchUsersParamsType } from '@educt/types';
import { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';

const useFetchUsers = (params?: FetchUsersParamsType | undefined) => {
  const handleError = useErrorHandler();

  const fetch = async (params?: FetchUsersParamsType | undefined) => {
    try {
      const result = await UserServiceInstance.fetchAll(params);
      return result.data;
    } catch (error) {
      handleError(error);
      return Promise.reject(error);
    }
  };

  const { execute: fetchUsers, ...state } = useAsync<IUser[], Parameters<typeof fetch>>(fetch);

  useEffect(() => {
    fetchUsers(params);
  }, []);

  return { ...state };
};

export { useFetchUsers };
