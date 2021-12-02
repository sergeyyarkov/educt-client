import React from 'react';

/**
 * Types
 */
import { ICourse } from '@educt/interfaces';

/**
 * Components
 */
import ConfirmDialog from '@educt/components/ConfirmDialog/ConfirmDialog';

/**
 * Hooks
 */
import { useDeleteCourse } from '@educt/hooks/queries/course/useDeleteCourse';
import { useHistory, useLocation } from 'react-router';
import useIsMountedRef from '@educt/hooks/useIsMountedRef';

type DeleteCourseDialogPropsType = {
  course: Pick<ICourse, 'id' | 'title'>;
  onClose: () => void;
  isOpen: boolean;
};

const DeleteCourseDialog: React.FC<DeleteCourseDialogPropsType> = ({ onClose, isOpen, course }) => {
  const { deleteCourse, isLoading } = useDeleteCourse();
  const isMountedRef = useIsMountedRef();
  const history = useHistory();
  const location = useLocation();

  const handleDelete = async (isConfirmed: boolean, id: string) => {
    if (isConfirmed) {
      try {
        await deleteCourse(id);
        if (isMountedRef.current && location.pathname !== '/courses') {
          history.push('/courses');
        }
      } catch (error: any) {
        console.error(error);
      }
    }

    if (isMountedRef.current) {
      /**
       * Close dialog
       */
      onClose();
    }
  };

  return (
    <ConfirmDialog
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={isConfirmed => handleDelete(isConfirmed, course.id)}
      title='Confirm deleting'
      message={`The course with title "${course.title}" will be removed from the system. After deleting a course, the lessons in it will also be deleted.`}
      confirmMessage='Delete'
    />
  );
};

export default DeleteCourseDialog;
