import React from 'react';
import { Flex, Box, Heading, Text } from '@chakra-ui/react';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

/**
 * Components
 */
import PrevPageButton from '@educt/components/PrevPageButton';
import CreateCourseForm from './components';

/**
 * Create course page
 */
const CreateCoursePage: React.FC<IPageProps> = () => {
  return (
    <Box maxW='1200px'>
      <Box>
        <Flex alignItems='center'>
          <PrevPageButton prevPage='/courses' />
          <Heading as='h1'>Create course</Heading>
        </Flex>
        <Text mt='3'>Fill in the required fields to create a course</Text>
      </Box>
      <Box mt='6'>
        <CreateCourseForm />
      </Box>
    </Box>
  );
};

export default CreateCoursePage;
