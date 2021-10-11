import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Tabs, TabList, Tab, Box, Heading, Text, Button } from '@chakra-ui/react';

import { IPageProps } from 'interfaces';
import { AddIcon } from '@chakra-ui/icons';

/**
 * Components
 */
import CourseList from './components/CourseList';
import CategoryList from './components/CategoryList';

/**
 * Hooks
 */
import { useRootStore } from 'hooks/useRootStore';
import { CoursesPageContextProvider } from 'providers';
import { useErrorHandler } from 'react-error-boundary';
import CategoryListLoading from './components/CategoryList/CategoryListLoading';
import CourseListLoading from './components/CourseList/CourseListLoading';

/**
 * Courses page
 */
const CoursesPage: React.FC<IPageProps> = ({ title }) => {
  const {
    userStore: { me },
    categoryStore,
    courseStore,
  } = useRootStore();
  const handleError = useErrorHandler();

  useEffect(() => {
    if (me !== null) {
      categoryStore.loadCategories().catch(error => handleError(error));
      courseStore.loadCourses().catch(error => handleError(error));
    }
  }, [me, categoryStore, courseStore, handleError]);

  /**
   * TODO: Loading page for courses
   */
  if (me === null) return null;

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
          {(me.isAdmin || me.isTeacher) && (
            <Tabs>
              <TabList justifyContent='center'>
                <Tab>All</Tab>
                <Tab>Published</Tab>
                <Tab>Draft</Tab>
              </TabList>
            </Tabs>
          )}
          <Box mt='5'>
            {/* Category List Rendering */}
            {categoryStore.categories !== null ? (
              <CategoryList categories={categoryStore.categories} />
            ) : (
              <CategoryListLoading />
            )}

            {/* Course List Rendering */}
            {courseStore.courses !== null ? <CourseList courses={courseStore.courses} /> : <CourseListLoading />}
          </Box>
        </Box>
      </Box>
    </CoursesPageContextProvider>
  );
};

export default observer(CoursesPage);
