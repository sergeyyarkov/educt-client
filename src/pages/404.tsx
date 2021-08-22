import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Box, Heading, Button } from '@chakra-ui/react';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Error 404</title>
      </Helmet>
      <Box textAlign='center' mt={40}>
        <Heading display='block' as='h1' fontSize='6xl'>
          Error 404
        </Heading>
        <Link to='/'>
          <Button variant='link' colorScheme='blue'>
            Return to main page
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default NotFoundPage;
