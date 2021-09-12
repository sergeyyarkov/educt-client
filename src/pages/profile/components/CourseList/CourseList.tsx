import React from 'react';
import { IUser } from 'interfaces';
import { Stack, StackDivider } from '@chakra-ui/layout';
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

  return (
    <Stack spacing='8' divider={<StackDivider />}>
      {courses.map(course => (
        <CourseItem course={course} key={course.id} />
      ))}
    </Stack>
  );
};

export default CourseList;
