import React from 'react';
import { observer } from 'mobx-react';
import { Box, Grid, Text } from '@chakra-ui/react';

/**
 * Types
 */
import { CourseStatusEnum } from '@educt/enums';
import { CourseItemPropsType } from './CourseItem';

/**
 * Components
 */
import DeleteCourseDialog from '../DeleteCourseDialog';
import LoadingList from '@educt/components/LoadingList';

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
  render: React.FC<CourseItemPropsType>;
};

const CourseList: React.FC<CourseListPropsType> = ({ render: Item }) => {
  const {
    userStore: { me },
    courseStore,
  } = useRootStore();
  const { selectedCategory, courseStatus, deletingCourse, setDeletingCourse } = useContext(CoursesPageContext);
  const { onOpen: onOpenDeleteDialog, onClose: onCloseDeleteDialog, isOpen: isOpenDeleteDialog } = useDisclosure();
  const handleError = useErrorHandler();
  const toast = useToast();
  const { courses, isLoading } = courseStore;

  /**
   * Fetch courses handler
   */
  useEffect(() => {
    if (me !== null) {
      courseStore.loadCourses({
        category_id: selectedCategory?.id,
        status: me.isAdmin || me.isTeacher ? courseStatus : CourseStatusEnum.PUBLISHED,
      });
    }
  }, [courseStore, selectedCategory, courseStatus]);

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

  if (courses === null || isLoading) return <LoadingList />;

  return (
    <Box>
      {deletingCourse && (
        <DeleteCourseDialog course={deletingCourse} onClose={onCloseDeleteDialog} isOpen={isOpenDeleteDialog} />
      )}
      {courses.length !== 0 ? (
        <Grid templateColumns={{ sm: 'repeat(auto-fill, minmax(400px, 1fr))' }} gap='4'>
          {courses.map(course => (
            <Item
              key={course.id}
              course={course}
              onDelete={() => {
                setDeletingCourse(course);
                onOpenDeleteDialog();
              }}
              onSetStatus={onSetStatus}
            />
          ))}
        </Grid>
      ) : (
        <Box textAlign='center' mt='10' userSelect='none'>
          <Text color='gray.500'>
            There are no courses&nbsp;
            {!selectedCategory && !courseStatus
              ? 'in the system yet'
              : `in this category${courseStatus ? ' or with this status' : ''}`}
            .
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default observer(CourseList);
