import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';
import CreateCourseForm from './components';

/**
 * Create course page
 */
const CreateCoursePage: React.FC<IPageProps> = ({ title }) => {
  return (
    <Box maxW='1200px'>
      <Box>
        <Heading as='h1'>Create course</Heading>
        <Text mt='2'>Fill in the required fields to create a course</Text>
      </Box>
      <Box mt='6'>
        <CreateCourseForm />
      </Box>
    </Box>
  );
};

export default CreateCoursePage;
