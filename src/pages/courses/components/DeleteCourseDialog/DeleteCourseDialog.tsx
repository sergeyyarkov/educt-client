import React, { useContext, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
} from '@chakra-ui/react';

/**
 * Components
 */
import ConfirmDialog from '@educt/components/ConfirmDialog/ConfirmDialog';

/**
 * Contexts
 */
import { CoursesPageContext } from '@educt/contexts';

/**
 * Hooks
 */
import { useErrorHandler } from 'react-error-boundary';
import { useRootStore } from '@educt/hooks/useRootStore';
import { ICourse } from '@educt/interfaces';

type DeleteCourseDialogPropsType = {
  course: Pick<ICourse, 'id' | 'title'>;
  onClose: () => void;
  isOpen: boolean;
};

const DeleteCourseDialog: React.FC<DeleteCourseDialogPropsType> = ({ onClose, isOpen, course }) => {
  const { courseStore } = useRootStore();
  const { setDeletingCourse } = useContext(CoursesPageContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleError = useErrorHandler();
  const toast = useToast();

  /**
   * Delete course handler
   *
   * @param isConfirmed Is dialog confirmed
   * @param id Course id
   */
  const deleteCourseHandler = async (isConfirmed: boolean, id: string) => {
    if (isConfirmed) {
      try {
        setIsLoading(true);
        await courseStore.deleteCourse(id);
        toast({ title: 'Course deleted.', status: 'info' });
      } catch (error: any) {
        if (error.response) {
          toast({ title: error.message, status: 'error' });
        } else {
          handleError(error);
        }
      } finally {
        setIsLoading(false);
        setDeletingCourse(undefined);
      }
    }

    /**
     * Close dialog
     */
    onClose();
  };

  return (
    <ConfirmDialog
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={isConfirmed => deleteCourseHandler(isConfirmed, course.id)}
      title='Confirm deleting'
      message={`The course with title "${course.title}" will be removed from the system. After deleting a course, the lessons in it will also be deleted.`}
      confirmMessage='Delete'
    />
  );
};

export default DeleteCourseDialog;
