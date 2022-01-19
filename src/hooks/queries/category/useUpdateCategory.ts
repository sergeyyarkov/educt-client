import axios from 'axios';
import { ICategory } from '@educt/interfaces';
import { CategoryServiceInstance } from '@educt/services';
import { UpdateCategoryParamsType } from '@educt/types';
import useAsync from '@educt/hooks/useAsync';
import { useToast } from '@chakra-ui/react';
import { useErrorHandler } from 'react-error-boundary';

const useUpdateCategory = () => {
  const toast = useToast();
  const handleError = useErrorHandler();

  const update = async (id: string, data: UpdateCategoryParamsType) => {
    try {
      const result = await CategoryServiceInstance.update(id, data);
      return result.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            default:
              toast({ title: `${error.message}`, status: 'error' });
              break;
          }
        } else {
          handleError(error);
        }
      } else {
        handleError(error);
      }

      return Promise.reject(error);
    }
  };

  const { execute: updateCategory, ...state } = useAsync<ICategory, Parameters<typeof update>>(update);

  return { updateCategory, ...state };
};

export { useUpdateCategory };
