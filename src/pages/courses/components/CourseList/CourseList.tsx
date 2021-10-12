import React, { useContext, useEffect } from 'react';
import { Box, Grid, Text } from '@chakra-ui/react';

/**
 * Types
 */
import { ICourse } from 'interfaces';

/**
 * Components
 */
import CourseItem from './CourseItem';
import CourseListLoading from './CourseListLoading';

/**
 * Hooks
 */
import { useRootStore } from 'hooks/useRootStore';

/**
 * Contexts
 */
import { CoursesPageContext } from 'contexts';

type CourseListPropsType = {
  courses: Omit<ICourse, 'teacher' | 'students' | 'lessons'>[] | null;
  isLoading: boolean;
};

const CourseList: React.FC<CourseListPropsType> = ({ courses, isLoading }) => {
  const { courseStore } = useRootStore();
  const { selectedCategory } = useContext(CoursesPageContext);

  useEffect(() => {
    courseStore.loadCourses({ category_id: selectedCategory?.id });
  }, [courseStore, selectedCategory]);

  if (isLoading || courses === null) {
    return <CourseListLoading />;
  }

  return (
    <>
      {courses.length !== 0 ? (
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
          {courses.map(course => (
            <CourseItem key={course.id} course={course} />
          ))}
        </Grid>
      ) : (
        <Box textAlign='center' mt='10' userSelect='none'>
          <Text color='gray.500'>There are no courses in this category.</Text>
        </Box>
      )}
    </>
  );
};

export default CourseList;
