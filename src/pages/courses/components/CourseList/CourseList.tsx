import React from 'react';
import { Box, Grid, Text } from '@chakra-ui/react';

/**
 * Types
 */
import { ICourse } from '@educt/interfaces';
import { CourseStatusEnum } from '@educt/enums';

/**
 * Components
 */
import CourseItem from './CourseItem';
import CourseListLoading from './CourseListLoading';
import DeleteCourseDialog from '../DeleteCourseDialog';

/**
 * Hooks
 */
import { useContext, useEffect } from 'react';
import { useRootStore } from '@educt/hooks/useRootStore';
import { useDisclosure } from '@chakra-ui/hooks';
import { useToast } from '@chakra-ui/toast';
import { useErrorHandler } from 'react-error-boundary';

/**
 * Contexts
 */
import { CoursesPageContext } from '@educt/contexts';

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
  const handleError = useErrorHandler();
  const toast = useToast();

  /**
   * Fetch handler
   */
  useEffect(() => {
    if (me !== null) {
      courseStore.loadCourses({
        category_id: selectedCategory?.id,
        status: me.isAdmin || me.isTeacher ? courseStatus : CourseStatusEnum.PUBLISHED,
      });
    }
  }, [courseStore, selectedCategory, courseStatus, me]);

  /**
   * Handle delete course
   * Set deleting course to context and open dialog
   */
  const onDeleteCourse = (course: Pick<ICourse, 'id' | 'title'>) => {
    setDeletingCourse(course);
    onOpenDeleteDialog();
  };

  /**
   * Handle update course status
   */
  const onSetStatus = async (id: string, status: CourseStatusEnum) => {
    try {
      await courseStore.setCourseStatus(id, status);
      toast({ title: 'Status updated.', status: 'info' });
    } catch (error: any) {
      if (error.response) {
        toast({ title: error.message, status: 'error' });
      } else {
        handleError(error);
      }
    }
  };

  if (isLoading || courses === null) {
    return <CourseListLoading />;
  }

  return (
    <>
      {deletingCourse && <DeleteCourseDialog onClose={onCloseDeleteDialog} isOpen={isOpenDeleteDialog} />}
      {courses.length !== 0 ? (
        <Grid templateColumns='repeat(auto-fill, minmax(400px, 1fr))' gap='6'>
          {/* Render items */}
          {courses.map(course => (
            <CourseItem key={course.id} course={course} onDelete={onDeleteCourse} onSetStatus={onSetStatus} />
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
