import React from 'react';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

/**
 * Components
 */
import { PageWrapper, PageHeading, PageContent } from '@educt/components/PageElements';
import { CreateButton } from '@educt/components/Buttons';
import LoadingPage from '@educt/components/LoadingPage';
import CourseList from './components/CourseList';
import CategoryList from './components/CategoryList';
import CategoryItem from './components/CategoryList/CategoryItem';
import CourseItem from './components/CourseList/CourseItem';

/**
 * Hooks
 */
import { useRootStore } from '@educt/hooks/useRootStore';
import { useHistory } from 'react-router';
import { CoursesTabs } from './components';

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
    <PageWrapper>
      <PageHeading heading='Courses' description='List of all courses' />
      {(me.isAdmin || me.isTeacher) && <CreateButton onClick={() => history.push('/courses/create')} />}
      <PageContent mt='10'>
        <CoursesTabs mb='7' />
        <CategoryList render={CategoryItem} />
        <CourseList render={CourseItem} />
      </PageContent>
    </PageWrapper>
  );
};

export default CoursesPage;
