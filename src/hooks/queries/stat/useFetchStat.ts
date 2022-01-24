import { StatServiceInstance } from '@educt/services/StatService';
import { StatInfoType } from '@educt/types';
import { useEffect } from 'react';
import useAsync from '@educt/hooks/useAsync';
import { useErrorHandler } from 'react-error-boundary';

const useFetchStat = () => {
  const handleError = useErrorHandler();

  const fetchStat = async () => {
    try {
      const result = await StatServiceInstance.fetchStat();
      return result.data;
    } catch (error) {
      handleError(error);
      return Promise.reject(error);
    }
  };

  const { execute: fetch, ...state } = useAsync<StatInfoType, Parameters<typeof fetchStat>>(fetchStat);

  useEffect(() => {
    fetch();
  }, []);

  return { ...state };
};

export { useFetchStat };
