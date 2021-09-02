import React from 'react';
import Helmet from 'react-helmet';
import { MdError } from 'react-icons/md';
import { Flex, Box, Heading, Text, useToast } from '@chakra-ui/react';

const NotFoundPage: React.FC = () => {
  const toast = useToast();

  React.useEffect(() => {
    toast({ title: `Page not found`, duration: 10000, isClosable: true, status: 'warning' });
  });

  return (
    <>
      <Helmet>
        <title>Error 404</title>
      </Helmet>
      <Box textAlign='center' mt={40}>
        <Flex justifyContent='center'>
          <MdError size='64px' />
        </Flex>
        <Heading display='block' as='h1' fontSize='6xl'>
          Page not found
        </Heading>
        <Text mt='5'>Sorry the page you are looking for could not be found.</Text>
      </Box>
    </>
  );
};

export default NotFoundPage;