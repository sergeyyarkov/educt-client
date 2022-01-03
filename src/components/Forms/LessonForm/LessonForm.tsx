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
  Icon,
  IconButton,
  Divider,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { UseFormReturn } from 'react-hook-form';
import { MdOutlineFilePresent, MdUpload } from 'react-icons/md';

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
          <FormHelperText>e.g Introduction</FormHelperText>
          <Text as='small' color='red.500'>
            {errors.title?.message}
          </Text>
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
          <Flex
            p='40px 0'
            textAlign={'center'}
            borderRadius={'md'}
            flexDir={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            borderWidth={'1px'}
          >
            <Box bg='gray.100' p='6' borderRadius={'full'}>
              <Icon as={MdUpload} h={16} w={16} color='gray.400' />
            </Box>
            <Box mt='4'>
              <Text fontSize={'md'}>
                Upload a video file <br />
                <Text as='span' fontSize='sm' color='gray.500'>
                  The video will be uploaded to cloud or local storage depending on the server configuration.
                </Text>
              </Text>
            </Box>
            <Button mt='6'>Select file</Button>
          </Flex>
          <FormHelperText>Supported formats: mp4, mov, avi, wmv, webm, flv</FormHelperText>
        </FormControl>

        <FormControl isRequired id='duration'>
          <FormLabel>Video duration</FormLabel>
          <Input type='time' defaultValue={'00:30:00'} step='1' {...register('duration')} />
          <FormHelperText>hours:minutes:seconds</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Materials</FormLabel>
          <Stack spacing={'1'}>
            {[1, 2, 3].map(k => (
              <Flex
                key={k}
                alignItems={'center'}
                justifyContent={'space-between'}
                p='3'
                bg={'gray.50'}
                borderRadius={'lg'}
                maxW='500px'
              >
                <Flex alignItems={'center'}>
                  <Icon as={MdOutlineFilePresent} mr='2' h={4} w={4} />
                  <Text overflow={'hidden'} fontSize={'sm'} fontWeight={'medium'} lineHeight={'1rem'}>
                    file.pdf
                    <br />
                    <Text as='small' color='gray.500'>
                      245kB
                    </Text>
                  </Text>
                </Flex>
                <IconButton aria-label='remove' variant={'unstyled'} size='xs' icon={<CloseIcon />} />
              </Flex>
            ))}
          </Stack>
          <Button leftIcon={<AddIcon />} variant={'outline'} size='sm' mt='3'>
            Upload new
          </Button>
          <FormHelperText>Supported formats: pdf, zip, rar, doc, docx</FormHelperText>
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
