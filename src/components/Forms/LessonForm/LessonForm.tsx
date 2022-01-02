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
} from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';

export type InputFields = {
  title: string;
  description: string;
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
    watch,
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
          <FormHelperText>e.g Variables in Javascript</FormHelperText>
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
          </Flex>
        </FormControl>

        <FormControl isRequired id='video'>
          <FormLabel>Video</FormLabel>
        </FormControl>

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
