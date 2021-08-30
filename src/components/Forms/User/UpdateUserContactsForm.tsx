import React from 'react';
import { MdSave } from 'react-icons/md';
import { Box, Heading, Stack } from '@chakra-ui/layout';
import { FormControl, FormHelperText } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';

const UpdateUserContactsForm: React.FC = () => {
  return (
    <Box as='form'>
      <Box borderRadius='md' borderWidth='1px' padding='20px'>
        <Heading as='h3' size='lg'>
          My Contacts
        </Heading>
        <Stack spacing='5px' margin='20px 0'>
          <FormControl id='tel'>
            <FormHelperText color='gray.500'>Telephone</FormHelperText>
            <Input type='number' size='md' variant='flushed' placeholder='123-456-7890' />
          </FormControl>
          <FormControl id='twitter'>
            <FormHelperText color='gray.500'>Twitter</FormHelperText>
            <Input type='text' size='md' variant='flushed' placeholder='https://twitter.com/id' />
          </FormControl>
          <FormControl id='telegram'>
            <FormHelperText color='gray.500'>Telegram</FormHelperText>
            <Input type='text' size='md' variant='flushed' placeholder='@tag' />
          </FormControl>
          <FormControl id='vk'>
            <FormHelperText color='gray.500'>VKontakte</FormHelperText>
            <Input type='text' size='md' variant='flushed' placeholder='https://vk.com/id' />
          </FormControl>
        </Stack>
      </Box>
      <Button colorScheme='blue' mt='4' type='submit' size='md' variant='outline' rightIcon={<MdSave />}>
        Save
      </Button>
    </Box>
  );
};

export default UpdateUserContactsForm;
