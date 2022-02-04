import { useEffect } from 'react';
import useAsync from '@educt/hooks/useAsync';
import { IUser } from '@educt/interfaces';
import { UserServiceInstance } from '@educt/services';

const useFetchUser = (id: string) => {
  const fetch = async (id: string) => {
    try {
      const { data } = await UserServiceInstance.fetchUserById(id);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const { execute: fetchUserById, ...state } = useAsync<IUser, Parameters<typeof fetch>>(fetch);

  useEffect(() => {
    fetchUserById(id);
  }, []);

  return { ...state };
};

export { useFetchUser };
