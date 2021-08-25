import React from 'react';
import { Skeleton } from '@chakra-ui/skeleton';
import { Box } from '@chakra-ui/layout';

const LoadingPage: React.FC = () => {
  return (
    <Box>
      <Skeleton height='20px' width='200px' mb='10' borderRadius='md' />
      <Skeleton height='43px' width='400px' borderRadius='md' />
    </Box>
  );
};

export default LoadingPage;
