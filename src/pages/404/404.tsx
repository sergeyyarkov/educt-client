import React from 'react';
import Helmet from 'react-helmet';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Flex, Box, Heading, Text, useToast, Link } from '@chakra-ui/react';
import { MdError } from 'react-icons/md';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

const NotFoundPage: React.FC<IPageProps> = ({ title }) => {
  const toast = useToast();

  React.useEffect(() => {
    toast({ title: `Page not found`, duration: 10000, isClosable: true, status: 'warning' });
  });

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Box textAlign='center' mt={40}>
        <Flex justifyContent='center'>
          <MdError size='64px' />
        </Flex>
        <Heading display='block' as='h1' fontSize='6xl'>
          Page not found
        </Heading>
        <Text mt='5'>Sorry the page you are looking for could not be found.</Text>
        <Link as={ReactRouterLink} to='/' color='blue.500'>
          Return to main page
        </Link>
      </Box>
    </>
  );
};

export default NotFoundPage;
