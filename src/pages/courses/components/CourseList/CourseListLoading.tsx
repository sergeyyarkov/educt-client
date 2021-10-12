import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const CourseListLoading: React.FC = () => {
  return (
    <Box textAlign='center' mt='10' userSelect='none'>
      <Text color='gray.500'>Wait a second...</Text>
    </Box>
  );
};

export default CourseListLoading;
