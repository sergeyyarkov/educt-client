import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';
import { observer } from 'mobx-react-lite';

/**
 * Create course page
 */
const CreateCoursePage: React.FC<IPageProps> = ({ title }) => {
  return (
    <>
      <Box>
        <Box>
          <Heading as='h1'>Create</Heading>
          <Text mt='2'>Create new course in the system.</Text>
        </Box>
      </Box>
    </>
  );
};

export default CreateCoursePage;
