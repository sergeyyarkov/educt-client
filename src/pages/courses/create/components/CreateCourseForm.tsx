import React from 'react';
import { Box, Grid, useToast } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Flex, Button, Textarea } from '@chakra-ui/react';
import { FormControl, FormLabel, InputGroup, InputRightElement } from '@chakra-ui/react';
import AsyncSelect from 'react-select/async';

/**
 * Types
 */
import { MdCloudUpload } from 'react-icons/md';
import { useRootStore } from '@educt/hooks/useRootStore';
import { UserRoleEnum } from '@educt/enums';
import { useErrorHandler } from 'react-error-boundary';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';

type CreateCourseInputType = {
  title: string;
  image: File;
  category_id: string;
  description: string;
  teacher_id: string;
};
type CreateCourseFormProps = {};

const CreateCourseForm: React.FC<CreateCourseFormProps> = () => {
  const {
    userStore: { userService },
    categoryStore: { categoryService },
  } = useRootStore();
  const { register, formState, handleSubmit, control, reset } = useForm<CreateCourseInputType>();
  const handleError = useErrorHandler();
  const toast = useToast();

  /**
   *  Load users into select field
   */
  const loadUsersOptions = async (inputValue: string) => {
    try {
      const users = await userService.fetchAll({ search: inputValue, role: UserRoleEnum.TEACHER });
      return users.data.map(user => ({
        label: user.fullname,
        value: user.id,
      }));
    } catch (error: any) {
      if (error.response) {
        toast({ title: 'Error' });
      } else {
        handleError(error);
      }
    }
  };

  /**
   *  Load categories into select filed
   */
  const loadCategoriesOptions = async (inputValue: string) => {
    try {
      const categories = await categoryService.fetchAll();
      return categories.data.map(category => ({
        label: category.title,
        value: category.id,
      }));
    } catch (error: any) {
      if (error.response) {
        toast({ title: 'Error' });
      } else {
        handleError(error);
      }
    }
  };

  /**
   * Submit form handler
   */
  const onSubmit: SubmitHandler<CreateCourseInputType> = async data => {
    console.log(data);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid templateColumns={{ md: '2.5fr 1fr' }} gap='5'>
          <FormControl id='title'>
            <FormLabel>Title</FormLabel>
            <InputGroup>
              <Input size='md' placeholder='Type course title' type='text' {...register('title')} />
              <InputRightElement fontSize='sm' mr='2' color='gray.500' children={'0/60'} />
            </InputGroup>
          </FormControl>
          <FormControl id='image'>
            <FormLabel>Image</FormLabel>
            <Input size='md' variant='unstyled' type='file' {...register('image')} />
          </FormControl>
          <FormControl id='category_id' gridColumn='1'>
            <FormLabel>Category</FormLabel>

            <Controller
              control={control}
              name='category_id'
              render={({ field: { onChange } }) => (
                <AsyncSelect
                  defaultOptions
                  cacheOptions
                  loadOptions={loadCategoriesOptions}
                  isSearchable={false}
                  onChange={selected => onChange(selected?.value)}
                  placeholder='Select Category'
                  loadingMessage={() => 'Loading...'}
                  noOptionsMessage={() => 'There are no categories.'}
                />
              )}
            />
          </FormControl>
          <FormControl id='teacher_id' gridColumn={{ md: '2' }} gridRow={{ md: '1' }}>
            <FormLabel>Teacher</FormLabel>
            <Controller
              control={control}
              name='teacher_id'
              render={({ field: { onChange } }) => (
                <AsyncSelect
                  defaultOptions
                  cacheOptions
                  loadOptions={loadUsersOptions}
                  onChange={selected => onChange(selected?.value)}
                  placeholder='Select Teacher'
                  loadingMessage={() => 'Loading...'}
                  noOptionsMessage={() => 'Cannot find any teacher.'}
                />
              )}
            />
          </FormControl>
          <FormControl id='description' gridColumn='1'>
            <FormLabel>Description</FormLabel>
            <Textarea resize='none' minH='150px' placeholder='Write some description for course...' />
          </FormControl>
        </Grid>
        <Flex mt='6'>
          <Button type='submit' mr='2' colorScheme='blue' variant='outline' rightIcon={<MdCloudUpload size='14px' />}>
            Save as Draft
          </Button>
          <Button type='submit' colorScheme='green'>
            Publish
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default CreateCourseForm;
