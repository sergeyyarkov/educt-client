import React from 'react';
import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';
import { Redirect } from 'react-router';
import { Icon, Box, Heading, Text } from '@chakra-ui/react';
import { MdError } from 'react-icons/md';

/**
 * Hooks
 */
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/toast';
import { useRootStore } from '@educt/hooks/useRootStore';

const ErrorFallback: React.FC<{ error: Error | AxiosError }> = props => {
  const { userStore, authStore } = useRootStore();
  const { error } = props;
  const toast = useToast();

  useEffect(() => {
    toast({ title: `${error.message}`, duration: 10000, isClosable: true, status: 'error' });
  });

  if (axios.isAxiosError(error)) {
    if (error.response) {
      if (error.response.status === 401) {
        userStore.me = null;
        authStore.setIsLoggedIn(false);
        Cookies.remove('logged_in');
      } else if (error.response.status === 404) return <Redirect to='/404' />;
    }
  }

  return (
    <Box textAlign='center' mt={40}>
      <Icon as={MdError} w='16' h='16' />
      <Heading display='block' as='h1' fontSize='6xl'>
        Something went wrong
      </Heading>
      <Text mt='5'>Sorry, something went wrong. Reload page and try your request again later.</Text>
    </Box>
  );
};

export default ErrorFallback;
