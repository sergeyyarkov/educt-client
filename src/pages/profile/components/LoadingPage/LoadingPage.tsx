import React from 'react';
import { Box, Skeleton, SkeletonCircle, Flex, Spinner } from '@chakra-ui/react';

const LoadingPage: React.FC = () => {
  return (
    <Box maxW='900px'>
      <Skeleton height='35px' width='250px' borderRadius='md' />
      <Flex alignItems='center' mt='20'>
        <Box>
          <SkeletonCircle size='128px' />
        </Box>
        <Flex ml='50' flexDirection='column'>
          <Skeleton height='25px' width='200px' mb='5' borderRadius='md' />
          <Skeleton height='25px' width='300px' borderRadius='md' />
        </Flex>
      </Flex>
      <Flex mt='20' justifyContent='center'>
        <Spinner size='xl' />
      </Flex>
    </Box>
  );
};

export default LoadingPage;
