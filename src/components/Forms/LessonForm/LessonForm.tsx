import React from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Text,
  Input,
  InputGroup,
  Stack,
  Box,
  Button,
  Textarea,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { Controller, UseFormReturn } from 'react-hook-form';
import VideoUploader from '@educt/components/VideoUploader';
import FilesUploader from '@educt/components/FilesUploader';
import { FileSupportedFormatsEnum, VideoSupportedFormatsEnum } from '@educt/enums';

export type InputFields = {
  title: string;
  description: string;
  duration: string;
  video: File;
  materials?: File[] | undefined;
};

export type LessonFormPropsType = {
  onSubmit: () => Promise<void>;
  buttonLabel: string;
  isLoading: boolean;
  reactHookForm: UseFormReturn<InputFields>;
};

const LessonForm: React.FC<LessonFormPropsType> = ({ onSubmit, buttonLabel, isLoading, reactHookForm }) => {
  const {
    control,
    register,
    formState: { errors, isDirty },
  } = reactHookForm;

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={'5'}>
        <FormControl isRequired id='title' isInvalid={!!errors.title}>
          <FormLabel>Title</FormLabel>
          <InputGroup>
            <Input placeholder='Lesson name' type='text' {...register('title')} />
          </InputGroup>
          <Text as='small' color='red.500'>
            {errors.title?.message}
          </Text>
          <FormHelperText>e.g Introduction</FormHelperText>
        </FormControl>

        <FormControl isRequired id='description' isInvalid={!!errors.description}>
          <FormLabel>Description</FormLabel>
          <Textarea resize='none' minH='150px' placeholder='Lesson description...' {...register('description')} />
          <Flex justifyContent='space-between'>
            <Text as='small' color='red.500'>
              {errors.description?.message}
            </Text>
          </Flex>
        </FormControl>

        <FormControl isRequired id='video'>
          <FormLabel>Video</FormLabel>
          <Controller
            control={control}
            name='video'
            render={({ field: { onChange, value: file } }) => (
              <VideoUploader onChange={file => onChange(file)} file={file} />
            )}
          />
          <Text as='small' color='red.500'>
            {errors.video?.message}
          </Text>
          <FormHelperText>
            Supported formats:{' '}
            {Object.keys(VideoSupportedFormatsEnum)
              .map(ext => `${ext.toLowerCase()}`)
              .join(', ')}
          </FormHelperText>
        </FormControl>

        <FormControl isRequired id='duration'>
          <FormLabel>Video duration</FormLabel>
          <Input type='time' defaultValue={'00:30:00'} step='1' {...register('duration')} />
          <Text as='small' color='red.500'>
            {errors.duration?.message}
          </Text>
          <FormHelperText>hours:minutes:seconds</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Materials</FormLabel>
          <Controller
            control={control}
            name='materials'
            render={({ field: { onChange, value: files } }) => (
              <FilesUploader onChange={files => onChange(files)} files={files} />
            )}
          />
          <Text as='small' color='red.500'>
            {errors.materials?.message}
          </Text>
          <FormHelperText>
            Supported formats:{' '}
            {Object.keys(FileSupportedFormatsEnum)
              .map(ext => `${ext.toLowerCase()}`)
              .join(', ')}
          </FormHelperText>
        </FormControl>

        <Divider />

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
      </Stack>
    </form>
  );
};

export default LessonForm;
