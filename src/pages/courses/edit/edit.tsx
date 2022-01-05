import React from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { Box, Tab, TabList, Flex, Tabs, TabPanels, TabPanel } from '@chakra-ui/react';

/**
 * Types
 */
import type { IPageProps } from '@educt/interfaces';

/**
 * Components
 */
import LoadingPage from '@educt/components/LoadingPage';
import { EditCourseForm } from '@educt/components/Forms/CourseForm';
import DeleteCourseDialog from '@educt/components/Dialogs/DeleteCourseDialog';
import PrevPageButton from '@educt/components/PrevPageButton';
import { DeleteButton } from '@educt/components/Buttons';
import { StatusButton } from './components';
import { PageContent, PageHeading, PageWrapper } from '@educt/components/PageElements';
import { StudentTableList, StudentTableRow } from './components/StudentTableList';
import LessonList from './components/LessonList';

/**
 * Hooks
 */
import { useParams } from 'react-router-dom';
import { useFetchCourse } from '@educt/hooks/queries';
import { useDisclosure } from '@chakra-ui/hooks';

/**
 * Course editor
 */
const EditCoursePage: React.FC<IPageProps> = () => {
  const params = useParams<{ id: string }>();
  const { error, data: course, isLoading } = useFetchCourse(params.id);
  const { onOpen: onOpenDeleteDialog, onClose: onCloseDeleteDialog, isOpen: isOpenDeleteDialog } = useDisclosure();

  if (error?.response?.status === 404) {
    return <Redirect to='/404' />;
  }

  if (!course || isLoading) return <LoadingPage />;

  return (
    <PageWrapper>
      <Helmet>
        <title>Editing {course.title}</title>
      </Helmet>

      <DeleteCourseDialog course={course} onClose={onCloseDeleteDialog} isOpen={isOpenDeleteDialog} />
      <PageHeading
        headingPrefix={<PrevPageButton prevPage='/courses' />}
        heading='Course editor'
        description={course.title}
      >
        <Flex mt='5' justifyContent='flex-end'>
          <StatusButton courseId={course.id} currentStatus={course.status} />
          <DeleteButton onClick={onOpenDeleteDialog} ml='2' />
        </Flex>
      </PageHeading>
      <PageContent>
        <Box>
          <Tabs mt='8'>
            <TabList>
              <Tab>Info</Tab>
              <Tab>Lessons</Tab>
              <Tab>Students</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box>
                  <EditCourseForm
                    defaultValues={{
                      title: course.title,
                      description: course.description,
                      education_description: course.education_description,
                      category_id: course.category.id,
                      teacher_id: course.teacher.id,
                      image: undefined,
                    }}
                  />
                </Box>
              </TabPanel>
              <TabPanel>
                <LessonList course={course} />
              </TabPanel>
              <TabPanel>
                <StudentTableList render={StudentTableRow} course={course} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </PageContent>
    </PageWrapper>
  );
};

export default EditCoursePage;
