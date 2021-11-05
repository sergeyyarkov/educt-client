import React, { useState } from 'react';
import {
  Box,
  Grid,
  useToast,
  Text,
  Flex,
  Button,
  Textarea,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Input,
} from '@chakra-ui/react';
import { MdAttachFile, MdCloudUpload } from 'react-icons/md';
import { SubmitHandler, useForm, useWatch, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncSelect from '@educt/components/AsyncSelect';

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
import { useColorModeValue } from '@chakra-ui/color-mode';
import useIsMountedRef from '@educt/hooks/useIsMountedRef';

/**
 * Schema
 */
import CreateCourseSchema from './CreateCourseForm.validator';
import FileSelect from '@educt/components/FileSelect/FileSelect';

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
    courseStore: { courseService },
  } = useRootStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
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
        <Grid templateColumns={{ md: '2.5fr 1fr' }} gap='5'>
          <FormControl id='title' isInvalid={!!errors.title}>
            <FormLabel>Title</FormLabel>
            <InputGroup>
              <Input pr='60px' size='md' placeholder='Type course title' type='text' {...register('title')} />
              <InputRightElement
                mr='2'
                children={
                  <Text as='small' color={!!errors.title || title.length > 90 ? 'red.500' : 'gray.500'}>
                    {title.length}/90
                  </Text>
                }
              />
            </InputGroup>
            <Text as='small' color='red.500'>
              {errors.title?.message}
            </Text>
          </FormControl>

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

          <FormControl id='category_id' gridColumn='1' isInvalid={!!errors.category_id}>
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
          <FormControl id='teacher_id' gridColumn={{ md: '2' }} gridRow={{ md: '1' }} isInvalid={!!errors.teacher_id}>
            <FormLabel>Teacher</FormLabel>
            <Controller
              control={control}
              name='teacher_id'
              render={({ field: { onChange, value } }) => (
                <AsyncSelect
                  loadOptions={loadUsersOptions}
                  onChange={selected => onChange(selected)}
                  value={value}
                  placeholder='Select Teacher'
                  noOptionsMessage='There are no teachers.'
                  loadingText='Wait...'
                />
              )}
            />
            <Text as='small' color='red.500'>
              {errors.teacher_id?.message}
            </Text>
          </FormControl>
          <FormControl id='description' gridColumn='1' isInvalid={!!errors.description}>
            <FormLabel>Description</FormLabel>
            <Textarea
              resize='none'
              minH='150px'
              placeholder='Write some description for course...'
              {...register('description')}
            />
            <Text as='small' color='red.500'>
              {errors.description?.message}
            </Text>
          </FormControl>
        </Grid>
        <Flex mt='6'>
          <Button
            loadingText='Saving...'
            type='submit'
            mr='2'
            colorScheme='blue'
            variant='outline'
            rightIcon={<MdCloudUpload size='14px' />}
            onClick={() => setStatus(CourseStatusEnum.DRAFT)}
          >
            Save as Draft
          </Button>
          <Button
            loadingText='Saving...'
            type='submit'
            colorScheme='green'
            onClick={() => setStatus(CourseStatusEnum.PUBLISHED)}
          >
            Publish
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default CreateCourseForm;
