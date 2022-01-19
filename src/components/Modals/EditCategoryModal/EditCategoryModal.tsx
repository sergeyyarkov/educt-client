import React from 'react';
import BaseModal from '@educt/components/Modal';
import { ICategory } from '@educt/interfaces';
import { MdModeEdit } from 'react-icons/md';
import { FormControl, FormLabel, FormHelperText, Stack, Input, Textarea } from '@chakra-ui/react';
import { UpdateCategoryParamsType } from '@educt/types';
import { yupResolver } from '@hookform/resolvers/yup';

/**
 * Schema
 */
import EditCategorySchema from './EditCategoryModal.validator';
import { useUpdateCategory } from '@educt/hooks/queries';

/**
 * Hooks
 */
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

type EditCategoryModalPropsType = {
  category: ICategory;
  isOpen: boolean;
  onClose: () => void;
  onEdited?: (updatedCategory: ICategory) => void | undefined;
};

type UpdateCategoryInputType = {
  title?: string | undefined;
  description?: string | undefined;
};

const EditCategoryModal: React.FC<EditCategoryModalPropsType> = props => {
  const { category, onClose, onEdited, isOpen } = props;
  const defaultValues = {
    title: category.title,
    description: category.description,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateCategoryInputType>({
    resolver: yupResolver(EditCategorySchema),
    defaultValues: useMemo(() => {
      return defaultValues;
    }, [props]),
  });
  const { updateCategory, isLoading } = useUpdateCategory();

  const onSubmit = async (data: UpdateCategoryParamsType) => {
    try {
      const updated = await updateCategory(category.id, data);
      onClose();
      onEdited && onEdited(updated);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    reset(defaultValues);
  }, [props.category]);

  return (
    <BaseModal
      icon={MdModeEdit}
      heading='Edit category'
      confirmText='Save'
      loadingText='Saving...'
      isLoading={isLoading}
      isOpen={isOpen}
      isDisabled={!isDirty}
      onClose={onClose}
      onProceed={handleSubmit(onSubmit)}
    >
      <Stack spacing={'4'}>
        <FormControl>
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

export default EditCategoryModal;
