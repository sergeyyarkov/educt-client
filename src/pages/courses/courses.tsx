import React from 'react';
import { Box } from '@chakra-ui/react';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

/**
 * Components
 */
import { PageWrapper, PageHeading, PageContent } from '@educt/components/PageElements';
import LoadingPage from '@educt/components/LoadingPage';
import CourseList from './components/CourseList';
import CategoryList from './components/CategoryList';
import CourseStatusTabs from './components/CourseStatusTabs';
import CategoryItem from './components/CategoryList/CategoryItem';
import CourseItem from './components/CourseList/CourseItem';

/**
 * Providers
 */
import { CoursesPageContextProvider } from '@educt/providers';

/**
 * Hooks
 */
import { useRootStore } from '@educt/hooks/useRootStore';

/**
 * Courses page
 */
const CoursesPage: React.FC<IPageProps> = () => {
  const {
    userStore: { me },
  } = useRootStore();

  if (me === null) return <LoadingPage />;

  return (
    <CoursesPageContextProvider>
      <PageWrapper>
        <PageHeading heading='Courses' description='List of all courses' />
        <PageContent mt='10'>
          {(me.isAdmin || me.isTeacher) && <CourseStatusTabs />}
          <Box mt='5'>
            <CategoryList render={CategoryItem} />
            <CourseList render={CourseItem} />
          </Box>
        </PageContent>
      </PageWrapper>
    </CoursesPageContextProvider>
  );
};

export default CoursesPage;
