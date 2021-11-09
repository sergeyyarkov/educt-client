import React, { useState } from 'react';
import {
  Box,
  Grid,
  useToast,
  Text,
  Flex,
  Stack,
  Button,
  Textarea,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Input,
  FormHelperText,
  Divider,
} from '@chakra-ui/react';
import { SubmitHandler, useForm, useWatch, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncSelect from '@educt/components/AsyncSelect';
import FileSelect from '@educt/components/FileSelect';

/**
 * Types
 */
import { OptionType } from '@educt/types';
import { CourseStatusEnum, UserRoleEnum } from '@educt/enums';

/**
 * Hooks
 */
import { useHistory } from 'react-router';
import { useRootStore } from '@educt/hooks/useRootStore';
import { useErrorHandler } from 'react-error-boundary';
import useIsMountedRef from '@educt/hooks/useIsMountedRef';

/**
 * Schema
 */
import CreateCourseSchema from './CreateCourseForm.validator';

type CreateCourseInputType = {
  title: string;
  image: File;
  category_id: string;
  description: string;
  teacher_id: string;
};
type CreateCourseFormPropsType = {};

const CreateCourseForm: React.FC<CreateCourseFormPropsType> = () => {
  const {
    userStore: { userService },
    categoryStore: { categoryService },
    courseStore: { courseService },
  } = useRootStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateCourseInputType>({
    resolver: yupResolver(CreateCourseSchema),
  });
  const handleError = useErrorHandler();
  const toast = useToast();
  const history = useHistory();
  const isMountedRef = useIsMountedRef();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<CourseStatusEnum | undefined>(undefined);

  const title = useWatch({
    control,
    name: 'title',
    defaultValue: '',
  });

  /**
   *  Load users into select field
   */
  const loadUsersOptions = async (): Promise<OptionType[] | undefined> => {
    try {
      const users = await userService.fetchAll({ limit: 12, role: UserRoleEnum.TEACHER });

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
  const loadCategoriesOptions = async (): Promise<OptionType[] | undefined> => {
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
    try {
      setIsLoading(true);
      await courseService.create({
        title: data.title,
        description: data.description,
        teacher_id: data.teacher_id,
        category_id: data.category_id,
        image: data.image,
        status: status ?? CourseStatusEnum.DRAFT,
      });
      toast({ title: `Course successfully created.`, status: 'success' });
      history.push('/courses');
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 422) {
          toast({ title: `${error.response.data.errors[0].message}`, status: 'error' });
        } else {
          toast({ title: `${error.message}`, status: 'error' });
        }
      } else {
        handleError(error);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
        setStatus(undefined);
      }
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing='5'>
          <FormControl isRequired id='title' isInvalid={!!errors.title}>
            <FormLabel>Name</FormLabel>
            <InputGroup>
              <Input pr='60px' size='md' placeholder='Course name' type='text' {...register('title')} />
              <InputRightElement
                mr='2'
                children={
                  <Text as='small' color={!!errors.title || title.length > 90 ? 'red.500' : 'gray.500'}>
                    {title.length}/90
                  </Text>
                }
              />
            </InputGroup>
            <FormHelperText>e.g Web Development in Javascript</FormHelperText>
            <Text as='small' color='red.500'>
              {errors.title?.message}
            </Text>
          </FormControl>

          <FormControl isRequired id='description' isInvalid={!!errors.description}>
            <FormLabel>Description</FormLabel>
            <Textarea resize='none' minH='150px' placeholder='Course description...' {...register('description')} />
            <Text as='small' color='red.500'>
              {errors.description?.message}
            </Text>
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
                  render={({ field: { onChange } }) => (
                    <FileSelect onChange={file => onChange(file)} supportedFormats={['JPG', 'JPEG', 'PNG', 'WEBP']} />
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
            loadingText='Saving...'
            type='submit'
            colorScheme='blue'
            onClick={() => setStatus(CourseStatusEnum.PUBLISHED)}
          >
            Create
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateCourseForm;
