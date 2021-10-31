import React from 'react';
import { Box, Text, Flex, Stack } from '@chakra-ui/layout';

/**
 * Types
 */
import { IMe } from '@educt/interfaces';

/**
 * Components
 */
import CourseItem from './CourseItem';

type CourseListPropsType = {
  courses: IMe['courses'];
};

const CourseList: React.FC<CourseListPropsType> = ({ courses }) => {
  if (courses === undefined) return null;

  if (courses.length === 0) {
    return (
      <Box textAlign='center' mt='10'>
        <Text color='gray.500' userSelect='none'>
          You are not a member of any course
        </Text>
      </Box>
    );
  }

  return (
    <Stack>
      {courses.map(course => (
        <CourseItem course={course} key={course.id} />
      ))}
    </Stack>
  );
};

export default CourseList;
