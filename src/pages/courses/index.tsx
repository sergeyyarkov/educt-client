import React from 'react';
import { Flex, Tabs, TabList, Tab, Box, Heading, Text, Button } from '@chakra-ui/react';

import { IPageProps } from 'interfaces';
import { AddIcon } from '@chakra-ui/icons';

/**
 * Components
 */
import CourseList from './components/CourseList';

/**
 * Courses page
 */
const CoursesPage: React.FC<IPageProps> = ({ title }) => {
  return (
    <Box>
      <Flex alignItems='center' justifyContent='space-between'>
        <Box>
          <Heading as='h1'>Courses</Heading>
          <Text mt='2'>List of all available courses.</Text>
        </Box>
        <Button variant='outline' colorScheme='blue' leftIcon={<AddIcon />}>
          Create new
        </Button>
      </Flex>
      <Box mt='7'>
        <Tabs>
          <TabList justifyContent='center'>
            <Tab>All</Tab>
            <Tab>Published</Tab>
            <Tab>Draft</Tab>
          </TabList>
        </Tabs>
        <CourseList />
      </Box>
    </Box>
  );
};

export default CoursesPage;
