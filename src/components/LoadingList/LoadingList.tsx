import React from 'react';
import { Box, Text } from '@chakra-ui/layout';

const LoadingList: React.FC = () => {
  return (
    <Box textAlign='center' margin='10px 0' userSelect='none'>
      <Text color='gray.500'>Wait a second...</Text>
    </Box>
  );
};

export default LoadingList;
