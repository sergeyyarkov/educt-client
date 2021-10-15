import React, { useContext, useEffect } from 'react';
import { Box, Grid, Text } from '@chakra-ui/react';

/**
 * Types
 */
import { ICourse } from '@educt/interfaces';

/**
 * Components
 */
import CourseItem from './CourseItem';
import CourseListLoading from './CourseListLoading';
import DeleteCourseDialog from '../DeleteCourseDialog';

/**
 * Hooks
 */
import { useRootStore } from '@educt/hooks/useRootStore';
import { useDisclosure } from '@chakra-ui/hooks';

/**
 * Contexts
 */
import { CoursesPageContext } from '@educt/contexts';
import { CourseStatusEnum } from '@educt/enums';

type CourseListPropsType = {
  courses: Omit<ICourse, 'teacher' | 'students' | 'lessons'>[] | null;
  isLoading: boolean;
};

const CourseList: React.FC<CourseListPropsType> = ({ courses, isLoading }) => {
  const {
    userStore: { me },
    courseStore,
  } = useRootStore();
  const { selectedCategory, courseStatus, deletingCourse, setDeletingCourse } = useContext(CoursesPageContext);
  const { onOpen: onOpenDeleteDialog, onClose: onCloseDeleteDialog, isOpen: isOpenDeleteDialog } = useDisclosure();

  useEffect(() => {
    if (me !== null) {
      courseStore.loadCourses({
        category_id: selectedCategory?.id,
        status: me.isAdmin || me.isTeacher ? courseStatus : CourseStatusEnum.PUBLISHED,
      });
    }
  }, [courseStore, selectedCategory, courseStatus, me]);

  const onDeleteCourse = (course: Pick<ICourse, 'id' | 'title'>) => {
    setDeletingCourse(course);
    onOpenDeleteDialog();
  };

  if (isLoading || courses === null) {
    return <CourseListLoading />;
  }

  return (
    <>
      {deletingCourse && <DeleteCourseDialog onClose={onCloseDeleteDialog} isOpen={isOpenDeleteDialog} />}
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
            <CourseItem key={course.id} course={course} onDelete={onDeleteCourse} />
          ))}
        </Grid>
      ) : (
        <Box textAlign='center' mt='10' userSelect='none'>
          <Text color='gray.500'>There are no courses in this category {courseStatus && 'or with this status'}.</Text>
        </Box>
      )}
    </>
  );
};

export default CourseList;
