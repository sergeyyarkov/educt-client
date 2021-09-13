import React from 'react';
import { IUser } from 'interfaces';
import { Box, Text, Stack, StackDivider } from '@chakra-ui/layout';
import CourseItem from './CourseItem';

type CourseListPropsType = {
  courses: IUser['courses'];
};

/**
 *  Render the course list on profile page for STUDENT role
 *  in "Available courses" tab
 */
const CourseList: React.FC<CourseListPropsType> = ({ courses }) => {
  if (courses === undefined) {
    return null;
  }

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
    <Stack spacing='8' divider={<StackDivider />}>
      {courses.map(course => (
        <CourseItem course={course} key={course.id} />
      ))}
    </Stack>
  );
};

export default CourseList;