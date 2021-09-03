import React from 'react';
import Cookies from 'js-cookie';
import { useToast, Flex, Box, Heading, Text } from '@chakra-ui/react';
import { MdError } from 'react-icons/md';
import { useRootStore } from 'hooks/useRootStore';

const ErrorFallback: React.FC<{ error: any }> = props => {
  const { userStore, authStore } = useRootStore();
  const { error } = props;
  const toast = useToast();

  React.useEffect(() => {
    toast({ title: `${error.message}`, duration: 10000, isClosable: true, status: 'error' });
  });

  if (error.response) {
    if (error.response.status === 401) {
      userStore.me = null;
      authStore.setIsLoggedIn(false);
      Cookies.remove('logged_in');
    }
  }

  return (
    <Box textAlign='center' mt={40}>
      <Flex justifyContent='center'>
        <MdError size='64px' />
      </Flex>
      <Heading display='block' as='h1' fontSize='6xl'>
        Something went wrong
      </Heading>
      <Text mt='5'>Sorry, something went wrong. Reload page and try your request again later.</Text>
    </Box>
  );
};

export default ErrorFallback;
