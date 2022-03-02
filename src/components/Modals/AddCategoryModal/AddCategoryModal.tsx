import React from 'react';
import BaseModal from '@educt/components/Modal';
import { FormControl, FormHelperText, FormLabel, Input, Stack, Textarea } from '@chakra-ui/react';
import { ICategory } from '@educt/interfaces';
import { MdCategory } from 'react-icons/md';
import { yupResolver } from '@hookform/resolvers/yup';

/**
 * Schema
 */
import AddCategorySchema from './AddCategoryModal.validator';

/**
 * Hooks
 */
import { useForm } from 'react-hook-form';
import { useCreateCategory } from '@educt/hooks/queries';

type AddCategoryModalPropsType = {
  isOpen: boolean;
  onClose: () => void;
  onAdded?: (category: ICategory) => void;
};

type AddCategoryInputType = {
  title: string;
  description: string;
};

const AddCategoryModal: React.FC<AddCategoryModalPropsType> = ({ isOpen, onClose, onAdded }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddCategoryInputType>({
    resolver: yupResolver(AddCategorySchema),
  });
  const { createCategory, isLoading } = useCreateCategory();

  const onSubmit = async (data: AddCategoryInputType) => {
    try {
      const category = await createCategory(data);
      onClose();
      onAdded && onAdded(category);
      reset({});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BaseModal
      icon={MdCategory}
      heading='Create category'
      description='Create new category'
      confirmText='Create'
      isOpen={isOpen}
      onClose={onClose}
      onProceed={handleSubmit(onSubmit)}
      isLoading={isLoading}
      loadingText='Saving...'
    >
      <Stack spacing={'4'}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input placeholder='e.g Management' {...register('title')} isInvalid={!!errors.title} />
          {errors.title && <FormHelperText color='red.500'>{errors?.title.message}</FormHelperText>}
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea resize={'none'} placeholder='Write a description...' {...register('description')} />
        </FormControl>
      </Stack>
    </BaseModal>
  );
};

export default AddCategoryModal;
