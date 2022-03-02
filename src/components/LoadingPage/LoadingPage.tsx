import { Flex, Box, Spinner, Text } from '@chakra-ui/react';
import React from 'react';

const LoadingPage: React.FC = () => {
  return (
    <Flex justifyContent='center' mt='20rem'>
      <Box mt='auto' mb='auto' textAlign='center'>
        <Spinner thickness='4px' speed='0.55s' emptyColor='gray.200' color='blue.500' size='xl' />
        <Text mt='2' color='gray.500' userSelect='none'>
          Loading...
        </Text>
      </Box>
    </Flex>
  );
};

export default LoadingPage;
