import useAsync from '@educt/hooks/useAsync';
import { ICategory } from '@educt/interfaces';
import { CategoryServiceInstance } from '@educt/services';
import { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';

const useFetchCategories = () => {
  const handleError = useErrorHandler();

  const fetchCategories = async () => {
    try {
      const result = await CategoryServiceInstance.fetchAll();
      return result.data;
    } catch (error) {
      handleError(error);
      return Promise.reject(error);
    }
  };

  const { execute: fetch, ...state } = useAsync<ICategory[], Parameters<typeof fetchCategories>>(fetchCategories);

  useEffect(() => {
    fetch();
  }, []);

  return { ...state };
};

export { useFetchCategories };
