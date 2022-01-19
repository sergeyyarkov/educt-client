import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import useAsync from '@educt/hooks/useAsync';
import { ICategory } from '@educt/interfaces';
import { CategoryServiceInstance } from '@educt/services';
import { CreateCategoryParamsType } from '@educt/types';
import { useErrorHandler } from 'react-error-boundary';

const useCreateCategory = () => {
  const toast = useToast();
  const handleError = useErrorHandler();

  const create = async (data: CreateCategoryParamsType) => {
    try {
      const result = await CategoryServiceInstance.create(data);
      return result.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
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
      } else {
        handleError(error);
      }
      return Promise.reject(error);
    }
  };

  const { execute: createCategory, ...state } = useAsync<ICategory, Parameters<typeof create>>(create);

  return { createCategory, ...state };
};

export { useCreateCategory };
