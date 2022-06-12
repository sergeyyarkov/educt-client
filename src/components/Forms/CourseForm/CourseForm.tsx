import React from 'react';
import { Button, Textarea, InputGroup, InputRightElement, Input } from '@chakra-ui/react';
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/form-control';
import { Flex, Box, Text, Divider, Stack } from '@chakra-ui/layout';
import { Controller, UseFormReturn } from 'react-hook-form';

/**
 * Types
 */
import type { OptionType } from '@educt/types';
import { UserRoleEnum } from '@educt/enums';

/**
 * Components
 */
import AsyncSelect from '@educt/components/AsyncSelect';
import FileSelect from '@educt/components/FileSelect';

/**
 * Hooks
 */
import { useErrorHandler } from 'react-error-boundary';

/**
 * Services
 */
import { CategoryServiceInstance, UserServiceInstance } from '@educt/services';
import { DESCRIPTION_MAX_LENGTH, EDUCATION_DESCRIPTION_MAX_LENGTH } from './CourseForm.validator';

export type InputFields = {
  title: string;
  image?: File | undefined;
  category_id: string;
  description: string;
  education_description: string | null;
  teacher_id: string;
};

export type CourseFormPropsType = {
  onSubmit: () => Promise<void>;
  buttonLabel: string;
  isLoading: boolean;
  reactHookForm: UseFormReturn<InputFields>;
};

const CourseForm: React.FC<CourseFormPropsType> = ({ onSubmit, buttonLabel, isLoading, reactHookForm }) => {
  const {
    control,
    register,
    watch,
    formState: { errors, isDirty },
  } = reactHookForm;

  const handleError = useErrorHandler();

  /**
   *  Load users into select field
   */
  const loadUsersOptions = async (): Promise<OptionType[] | undefined> => {
    try {
      const teachers = await UserServiceInstance.fetchAll({ role: UserRoleEnum.TEACHER });
      const admins = await UserServiceInstance.fetchAll({ role: UserRoleEnum.ADMIN });

      return teachers.data.concat(admins.data).map(user => ({
        label: user.fullname,
        value: user.id,
      }));
    } catch (error) {
      handleError(error);
    }
  };

  /**
   *  Load categories into select filed
   */
  const loadCategoriesOptions = async (): Promise<OptionType[] | undefined> => {
    try {
      const categories = await CategoryServiceInstance.fetchAll();
      return categories.data.map(category => ({
        label: category.title,
        value: category.id,
      }));
    } catch (error) {
      handleError(error);
    }
  };

  const watchTitle = watch('title');
  const watchDescription = watch('description');
  const watchEducationDescription = watch('education_description');

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing='5'>
        <FormControl isRequired id='title' isInvalid={!!errors.title}>
          <FormLabel>Name</FormLabel>
          <InputGroup>
            <Input pr='60px' size='md' placeholder='Course name' type='text' {...register('title')} />
            <InputRightElement mr='2'>
              <Text as='small' color={!!errors.title || watchTitle?.length > 90 ? 'red.500' : 'gray.500'}>
                {watchTitle?.length || 0}/90
              </Text>
            </InputRightElement>
          </InputGroup>
          <FormHelperText>e.g Web Development in Javascript</FormHelperText>
          <Text as='small' color='red.500'>
            {errors.title?.message}
          </Text>
        </FormControl>

        <FormControl isRequired id='description' isInvalid={!!errors.description}>
          <FormLabel>Description</FormLabel>
          <Textarea resize='none' minH='150px' placeholder='Course description...' {...register('description')} />
          <Flex justifyContent='space-between'>
            <Text as='small' color='red.500'>
              {errors.description?.message}
            </Text>
            <Text
              as='small'
              color={!!errors.description || watchDescription?.length > DESCRIPTION_MAX_LENGTH ? 'red.500' : 'gray.500'}
            >
              {watchDescription?.length || 0}/{DESCRIPTION_MAX_LENGTH}
            </Text>
          </Flex>
        </FormControl>

        <FormControl id='education_description' isInvalid={!!errors.education_description}>
          <FormLabel>What you&apos;ll learn section</FormLabel>
          <Textarea resize='none' minH='80px' {...register('education_description')} />
          <Flex justifyContent='space-between'>
            <Text as='small' color='red.500'>
              {errors.education_description?.message}
            </Text>
            {watchEducationDescription && (
              <Text
                as='small'
                color={
                  !!errors.education_description || watchEducationDescription.length > EDUCATION_DESCRIPTION_MAX_LENGTH
                    ? 'red.500'
                    : 'gray.500'
                }
              >
                {watchEducationDescription.length || 0}/{EDUCATION_DESCRIPTION_MAX_LENGTH}
              </Text>
            )}
          </Flex>
        </FormControl>

        <Flex justifyContent='space-between' flexDirection={{ base: 'column', lg: 'row' }}>
          <Box flexGrow={1} flexBasis='0' mr={{ base: '0', lg: '7' }}>
            <Stack spacing='5'>
              <FormControl isRequired id='category_id' isInvalid={!!errors.category_id}>
                <FormLabel>Category</FormLabel>
                <Controller
                  control={control}
                  name='category_id'
                  render={({ field: { onChange, value } }) => (
                    <AsyncSelect
                      loadOptions={loadCategoriesOptions}
                      onChange={selected => onChange(selected)}
                      value={value}
                      placeholder='Select Category'
                      noOptionsMessage='There are no categories.'
                      loadingText='Wait...'
                    />
                  )}
                />
                <Text as='small' color='red.500'>
                  {errors.category_id?.message}
                </Text>
              </FormControl>

              <FormControl isRequired id='teacher_id' isInvalid={!!errors.teacher_id}>
                <FormLabel>Author</FormLabel>
                <Controller
                  control={control}
                  name='teacher_id'
                  render={({ field: { onChange, value } }) => (
                    <AsyncSelect
                      loadOptions={loadUsersOptions}
                      onChange={selected => onChange(selected)}
                      value={value}
                      placeholder='Select Author'
                      noOptionsMessage='There are no teachers.'
                      loadingText='Wait...'
                    />
                  )}
                />
                <Text as='small' color='red.500'>
                  {errors.teacher_id?.message}
                </Text>
              </FormControl>
            </Stack>
          </Box>

          <Box flexGrow={0} flexBasis='50%' mt={{ base: '5', lg: '0' }}>
            <FormControl id='image' isInvalid={!!errors.image}>
              <FormLabel>Image</FormLabel>
              <Controller
                control={control}
                name='image'
                render={({ field: { onChange, value: file } }) => (
                  <FileSelect
                    onChange={file => onChange(file)}
                    file={file}
                    supportedFormats={['JPG', 'JPEG', 'PNG', 'WEBP']}
                  />
                )}
              />
              <Text as='small' color='red.500'>
                {errors.image?.message}
              </Text>
            </FormControl>
          </Box>
        </Flex>
      </Stack>

      <Divider mt='5' />

      <Box mt='5'>
        <Button
          isLoading={isLoading}
          isDisabled={!isDirty}
          loadingText='Saving...'
          type='submit'
          colorScheme='blue'
          variant='outline'
        >
          {buttonLabel}
        </Button>
      </Box>
    </form>
  );
};

export default CourseForm;
