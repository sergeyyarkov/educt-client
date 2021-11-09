import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

import { IPageProps } from '@educt/interfaces';

/**
 * Lessons page
 */
const LessonsPage: React.FC<IPageProps> = () => {
  return (
    <Box>
      <Heading as='h1'>Lessons page</Heading>
      <Text mt='2'>List of all created lessons in the system.</Text>
    </Box>
  );
};

export default LessonsPage;
