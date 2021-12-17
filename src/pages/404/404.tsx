import React from 'react';
import Helmet from 'react-helmet';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Flex, Heading, Text, Link, Icon } from '@chakra-ui/react';
import { MdError } from 'react-icons/md';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';
import { PageContent, PageWrapper } from '@educt/components/PageElements';

/**
 * Hooks
 */
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

const NotFoundPage: React.FC<IPageProps> = ({ title }) => {
  const toast = useToast();

  useEffect(() => {
    toast({ title: `Page not found`, duration: 10000, isClosable: true, status: 'warning' });
  }, []);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageWrapper textAlign='center' mt={40}>
        <PageContent>
          <Icon as={MdError} w='16' h='16' />
          <Heading display='block' as='h1' fontSize='6xl'>
            Page not found
          </Heading>
          <Text mt='5'>Sorry the page you are looking for could not be found.</Text>
          <Link as={ReactRouterLink} to='/' color='blue.500'>
            Return to main page
          </Link>
        </PageContent>
      </PageWrapper>
    </>
  );
};

export default NotFoundPage;
