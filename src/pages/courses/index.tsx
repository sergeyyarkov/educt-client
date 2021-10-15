import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Box, Heading, Text, Button } from '@chakra-ui/react';

import { IPageProps } from '@educt/interfaces';
import { AddIcon } from '@chakra-ui/icons';

/**
 * Components
 */
import CourseList from './components/CourseList';
import CategoryList from './components/CategoryList';
import LoadingPage from '@educt/components/LoadingPage';

/**
 * Hooks
 */
import { useRootStore } from '@educt/hooks/useRootStore';
import { CoursesPageContextProvider } from '@educt/providers';
import CourseStatusTabs from './components/CourseStatusTabs';

/**
 * Courses page
 */
const CoursesPage: React.FC<IPageProps> = ({ title }) => {
  const {
    userStore: { me },
    categoryStore,
    courseStore,
  } = useRootStore();

  useEffect(() => {
    console.log('upadate');
  });

  if (me === null) return <LoadingPage />;

  return (
    <CoursesPageContextProvider>
      <Box>
        <Flex alignItems='center' justifyContent='space-between'>
          <Box>
            <Heading as='h1'>Courses</Heading>
            <Text mt='2'>List of all available courses.</Text>
          </Box>
          {(me.isAdmin || me.isTeacher) && (
            <Button variant='outline' colorScheme='blue' leftIcon={<AddIcon />}>
              Create new
            </Button>
          )}
        </Flex>
        <Box mt='7'>
          {(me.isAdmin || me.isTeacher) && <CourseStatusTabs />}
          <Box mt='5'>
            <CategoryList categories={categoryStore.categories} isLoading={categoryStore.isLoading} />
            <CourseList courses={courseStore.courses} isLoading={courseStore.isLoading} />
          </Box>
        </Box>
      </Box>
    </CoursesPageContextProvider>
  );
};

export default observer(CoursesPage);
