import React from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { Box, Heading, Text, Tab, TabList, Tabs, TabPanels, TabPanel, Button } from '@chakra-ui/react';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

/**
 * Components
 */
import LoadingPage from '@educt/components/LoadingPage';
import { EditCourseForm } from '@educt/components/Forms/CourseForm';

/**
 * Hooks
 */
import useFetchCourseQuery from '@educt/hooks/useFetchCourseQuery';
import { useParams } from 'react-router-dom';

/**
 * Course editor
 */
const EditCoursePage: React.FC<IPageProps> = () => {
  const params = useParams<{ id: string }>();
  const { data: course, loading, error } = useFetchCourseQuery(params.id);

  /**
   * Not Found
   */
  if (error?.response?.status === 404) return <Redirect to='/404' />;

  /**
   * Loading
   */
  if (loading || course === null) return <LoadingPage />;

  return (
    <>
      <Helmet>
        <title>Editing {course.title}</title>
      </Helmet>
      <Box>
        <Heading as='h1'>Course editor</Heading>
        <Text mt='2'>{course.title}</Text>
      </Box>
      <Box>
        <Tabs isLazy mt='8'>
          <TabList>
            <Tab>Info</Tab>
            <Tab>Lessons</Tab>
            <Tab>Students</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <EditCourseForm
                defaultValues={{
                  title: course.title,
                  description: course.description,
                  category_id: course.category.id,
                  teacher_id: course.teacher.id,
                  image: undefined,
                }}
              />
            </TabPanel>
            <TabPanel>
              {course.lessons.length === 0 ? (
                <Box textAlign='center' mt='10'>
                  <Text>No lessons have been added to this course yet</Text>
                  <Button mt='3' size='sm' colorScheme='blue' variant='outline'>
                    Create new lesson
                  </Button>
                </Box>
              ) : null}
            </TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default EditCoursePage;
