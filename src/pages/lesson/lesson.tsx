import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

/**
 * Hooks
 */
import { useParams } from 'react-router-dom';

/**
 * Lesson Page
 */
const LessonPage: React.FC<IPageProps> = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Box>
      <Heading as='h1'>Lesson {id}</Heading>
    </Box>
  );
};

export default LessonPage;
