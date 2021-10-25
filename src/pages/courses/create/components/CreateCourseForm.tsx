import React from 'react';
import { Box, Grid } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Select, Flex, Button, Textarea } from '@chakra-ui/react';
import { FormControl, FormLabel, InputGroup, InputRightElement } from '@chakra-ui/react';

/**
 * Types
 */
import { MdCloudUpload } from 'react-icons/md';

type CreateCourseFormProps = {};

const CreateCourseForm: React.FC<CreateCourseFormProps> = () => {
  return (
    <Box>
      <form>
        <Grid templateColumns={{ md: '2.5fr 1fr' }} gap='5'>
          <FormControl id='title'>
            <FormLabel>Title</FormLabel>
            <InputGroup>
              <Input size='md' placeholder='Type course title' type='text' />
              <InputRightElement fontSize='sm' mr='2' color='gray.500' children={'0/60'} />
            </InputGroup>
          </FormControl>

          <FormControl id='image'>
            <FormLabel>Image</FormLabel>
            <Input size='md' variant='unstyled' type='file' />
          </FormControl>

          <FormControl id='category' gridColumn='1'>
            <FormLabel>Category</FormLabel>
            <Select size='md' placeholder='Select category'>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
          </FormControl>

          <FormControl id='title' gridColumn={{ md: '2' }} gridRow={{ md: '1' }}>
            <FormLabel>Teacher</FormLabel>
            <Button w='full'>Select Teacher</Button>
          </FormControl>

          <FormControl id='description' gridColumn='1'>
            <FormLabel>Description</FormLabel>
            <Textarea resize='none' minH='150px' placeholder='Write some description for course...' />
          </FormControl>
        </Grid>
        <Flex mt='6'>
          <Button mr='2' colorScheme='blue' variant='outline' rightIcon={<MdCloudUpload size='14px' />}>
            Save as Draft
          </Button>
          <Button colorScheme='green'>Publish</Button>
        </Flex>
      </form>
    </Box>
  );
};

export default CreateCourseForm;
