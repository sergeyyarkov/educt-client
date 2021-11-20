import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { Box, Heading, Text, Tab, TabList, Flex, Tabs, TabPanels, TabPanel } from '@chakra-ui/react';

/**
 * Types
 */
import type { IPageProps } from '@educt/interfaces';

/**
 * Components
 */
import LoadingPage from '@educt/components/LoadingPage';
import { EditCourseForm } from '@educt/components/Forms/CourseForm';
import { LessonList, LessonItem } from './components/LessonList';
import { StudentList, StudentItem } from './components/StudentList';

/**
 * Hooks
 */
import { useParams } from 'react-router-dom';
import useFetchCourseQuery from '@educt/hooks/useFetchCourseQuery';

/**
 * Course editor
 */
const EditCoursePage: React.FC<IPageProps> = () => {
  const params = useParams<{ id: string }>();
  const { data: course, error, isLoading } = useFetchCourseQuery(params.id);

  /**
   * Not Found
   */
  if (error?.response?.status === 404) return <Redirect to='/404' />;

  /**
   * Loading
   */
  if (isLoading || !course) return <LoadingPage />;

  return (
    <>
      <Helmet>
        <title>Editing {course.title}</title>
      </Helmet>
      <Flex>
        <Box>
          <Heading as='h1'>Course editor</Heading>
          <Text mt='2'>{course.title}</Text>
        </Box>
        <Box></Box>
      </Flex>
      <Box>
        <Tabs isLazy mt='8'>
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
                    category_id: course.category.id,
                    teacher_id: course.teacher.id,
                    image: undefined,
                  }}
                />
              </Box>
            </TabPanel>
            <TabPanel>
              <LessonList render={LessonItem} course={course} />
            </TabPanel>
            <TabPanel>
              <StudentList render={StudentItem} students={course.students} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default EditCoursePage;
