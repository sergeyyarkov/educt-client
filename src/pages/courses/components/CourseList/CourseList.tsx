import React, { useState } from 'react';
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
import DeleteCourseDialog from '@educt/components/Dialogs/DeleteCourseDialog';
import LoadingList from '@educt/components/LoadingList';

/**
 * Hooks
 */
import { useEffect } from 'react';
import { useSetCourseStatus } from '@educt/hooks/queries';
import { useRootStore } from '@educt/hooks/useRootStore';
import { useDisclosure } from '@chakra-ui/hooks';

/**
 * Contexts
 */
import { ICourse } from '@educt/interfaces';

type CourseListPropsType = {
  render: React.FC<CourseItemPropsType>;
};

const CourseList: React.FC<CourseListPropsType> = ({ render: Item }) => {
  const {
    userStore: { me },
    courseStore,
    pageStore: { coursesStore },
  } = useRootStore();
  const [deleting, setDeleting] = useState<Pick<ICourse, 'id' | 'title'> | null>(null);
  const { onOpen: onOpenDeleteDialog, onClose: onCloseDeleteDialog, isOpen: isOpenDeleteDialog } = useDisclosure();
  const { setCourseStatus } = useSetCourseStatus();
  const { courses, isLoading } = courseStore;

  const handleDeleteCourse = (course: Pick<ICourse, 'id' | 'title'>) => {
    setDeleting(course);
    onOpenDeleteDialog();
  };

  /**
   * Fetch courses handler
   */
  useEffect(() => {
    if (me !== null) {
      courseStore.loadCourses({
        category_id: coursesStore.selectedCategory?.id,
        status: me.isAdmin || me.isTeacher ? coursesStore.showedStatus : CourseStatusEnum.PUBLISHED,
      });
    }
  }, [courseStore, coursesStore.selectedCategory, coursesStore.showedStatus]);

  if (courses === null || isLoading) return <LoadingList />;

  return (
    <Box>
      {deleting && <DeleteCourseDialog course={deleting} onClose={onCloseDeleteDialog} isOpen={isOpenDeleteDialog} />}
      {courses.length !== 0 ? (
        <Grid templateColumns={{ sm: 'repeat(auto-fill, minmax(400px, 1fr))' }} gap='4'>
          {courses.map(course => (
            <Item
              key={course.id}
              course={course}
              onDelete={() => handleDeleteCourse({ id: course.id, title: course.title })}
              onSetStatus={setCourseStatus}
            />
          ))}
        </Grid>
      ) : (
        <Box textAlign='center' mt='10' userSelect='none'>
          <Text color='gray.500'>
            There are no courses&nbsp;
            {!coursesStore.selectedCategory && !coursesStore.showedStatus
              ? 'in the system yet'
              : `in this category${coursesStore.showedStatus ? ' or with this status' : ''}`}
            .
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default observer(CourseList);
