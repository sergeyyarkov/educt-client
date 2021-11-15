import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

import { IPageProps } from '@educt/interfaces';

/**
 * Create Lesson page
 */
const CreateLessonPage: React.FC<IPageProps> = () => {
  return (
    <Box>
      <Heading as='h1'>Create Lesson page</Heading>
    </Box>
  );
};

export default CreateLessonPage;
