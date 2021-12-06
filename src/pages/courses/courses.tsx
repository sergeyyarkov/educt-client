import React from 'react';
import { Flex, Box, Heading, Text, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

/**
 * Components
 */
import CourseList from './components/CourseList';
import CategoryList from './components/CategoryList';
import CourseStatusTabs from './components/CourseStatusTabs';
import LoadingPage from '@educt/components/LoadingPage';

/**
 * Providers
 */
import { CoursesPageContextProvider } from '@educt/providers';

/**
 * Hooks
 */
import { useRootStore } from '@educt/hooks/useRootStore';
import { useHistory } from 'react-router';
import CategoryItem from './components/CategoryList/CategoryItem';
import CourseItem from './components/CourseList/CourseItem';
import { CreateButton } from '@educt/components/Buttons';

/**
 * Courses page
 */
const CoursesPage: React.FC<IPageProps> = () => {
  const {
    userStore: { me },
  } = useRootStore();
  const history = useHistory();

  if (me === null) return <LoadingPage />;

  return (
    <CoursesPageContextProvider>
      <Box>
        <Flex alignItems='center' justifyContent='space-between'>
          <Box>
            <Heading as='h1'>Courses</Heading>
            <Text mt='2'>List of all courses.</Text>
          </Box>
          {(me.isAdmin || me.isTeacher) && <CreateButton onClick={() => history.push('/courses/create')} />}
        </Flex>
        <Box mt='7'>
          {(me.isAdmin || me.isTeacher) && <CourseStatusTabs />}
          <Box mt='5'>
            <CategoryList render={CategoryItem} />
            <CourseList render={CourseItem} />
          </Box>
        </Box>
      </Box>
    </CoursesPageContextProvider>
  );
};

export default CoursesPage;
