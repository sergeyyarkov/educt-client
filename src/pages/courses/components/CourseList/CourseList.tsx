import React from 'react';
import { Grid } from '@chakra-ui/react';

/**
 * Types
 */
import { ICourse } from 'interfaces';

/**
 * Components
 */
import CourseItem from './CourseItem';

type CourseListPropsType = {
  courses: Omit<ICourse, 'teacher' | 'students' | 'lessons'>[];
};

const CourseList: React.FC<CourseListPropsType> = ({ courses }) => {
  return (
    <Grid
      templateColumns='repeat(3, 1fr)'
      gap='6'
      sx={{
        '@media (max-width: 1280px)': {
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        '@media (max-width: 768px)': {
          gridTemplateColumns: 'repeat(1, 1fr)',
        },
      }}
    >
      {courses.map(course => {
        return <CourseItem key={course.id} course={course} />;
      })}
    </Grid>
  );
};

export default CourseList;
