import React, { useEffect, useState } from 'react';
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
import * as constants from '@educt/constants';
import { Controller, UseFormReturn } from 'react-hook-form';
import VideoUploader from '@educt/components/VideoUploader';
import FilesUploader from '@educt/components/FilesUploader';
import { FileSupportedFormatsEnum, VideoSupportedFormatsEnum } from '@educt/enums';
import type { AttachmentFileType, LessonVideoType } from '@educt/types';
import { DESCRIPTION_MAX_LENGTH } from './LessonForm.validator';

export type InputFields = {
  title: string;
  description: string;
  duration: string;
  video: File;
  linked_video_url?: string | undefined;
  materials?: FileList | undefined;
};

export type LessonFormPropsType = {
  onSubmit: () => Promise<void>;
  buttonLabel: string;
  isLoading: boolean;
  reactHookForm: UseFormReturn<InputFields>;
  preloadedVideo?: LessonVideoType | undefined;
  preloadedMaterials?: AttachmentFileType[] | undefined;
};

const LessonForm: React.FC<LessonFormPropsType> = ({
  onSubmit,
  buttonLabel,
  isLoading,
  reactHookForm,
  preloadedVideo,
  preloadedMaterials,
}) => {
  const {
    control,
    register,
    watch,
    formState: { errors, isDirty },
    unregister,
  } = reactHookForm;

  const [isLinkedVideoUrl, setIsLinkedVideoUrl] = useState<boolean>(false);

  const watchDescription = watch('description');

  useEffect(() => {
    if (!isLinkedVideoUrl) {
      unregister('linked_video_url');
    }
  }, [isLinkedVideoUrl]);

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
            <Text
              as='small'
              color={!!errors.description || watchDescription?.length > DESCRIPTION_MAX_LENGTH ? 'red.500' : 'gray.500'}
            >
              {watchDescription?.length || 0}/{DESCRIPTION_MAX_LENGTH}
            </Text>
          </Flex>
        </FormControl>

        {isLinkedVideoUrl ? (
          <FormControl id='linked_video_url'>
            <FormLabel>Video URL</FormLabel>
            <Input placeholder='Link to video source. (YouTube, Vimeo, .mp4)' {...register('linked_video_url')} />
            <Text as='small' color='red.500'>
              {errors.linked_video_url?.message}
            </Text>
            <FormHelperText textDecoration={'underline'} cursor='pointer' onClick={() => setIsLinkedVideoUrl(false)}>
              choose from files
            </FormHelperText>
          </FormControl>
        ) : (
          <FormControl id='video'>
            <FormLabel>Video</FormLabel>
            <Controller
              control={control}
              name='video'
              render={({ field: { onChange, value: file } }) => (
                <VideoUploader
                  onChange={file => onChange(file)}
                  file={file}
                  setIsLinkedVideoUrl={setIsLinkedVideoUrl}
                  preloadedVideoUrl={preloadedVideo && constants.BACKEND_URL + preloadedVideo.url}
                />
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
        )}

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
              <FilesUploader
                onChange={files => onChange(files)}
                files={Array.from(files || [])}
                preloadedFiles={preloadedMaterials}
              />
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
