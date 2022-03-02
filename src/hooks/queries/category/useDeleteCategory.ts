import axios from 'axios';
import { CategoryServiceInstance } from '@educt/services';
import { useErrorHandler } from 'react-error-boundary';
import { ICategory } from '@educt/interfaces';
import { useToast } from '@chakra-ui/react';
import useAsync from '@educt/hooks/useAsync';

const useDeleteCategory = () => {
  const toast = useToast();
  const handleError = useErrorHandler();

  const query = async (id: string) => {
    try {
      const result = await CategoryServiceInstance.delete(id);
      toast({ title: 'Category deleted.', status: 'info' });
      return result.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Error: ', error);
        } else {
          handleError(error);
        }
      }
      return Promise.reject(error);
    }
  };

  const { execute: deleteCategory, ...state } = useAsync<ICategory, Parameters<typeof query>>(query);

  return { deleteCategory, ...state };
};

export { useDeleteCategory };
