import React, { useContext } from 'react';

/**
 * Types
 */
import { ICourse } from '@educt/interfaces';

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
import { useDeleteCourse } from '@educt/hooks/queries/course/useDeleteCourse';

type DeleteCourseDialogPropsType = {
  course: Pick<ICourse, 'id' | 'title'>;
  onClose: () => void;
  isOpen: boolean;
};

const DeleteCourseDialog: React.FC<DeleteCourseDialogPropsType> = ({ onClose, isOpen, course }) => {
  const { setDeletingCourse } = useContext(CoursesPageContext);
  const { deleteCourse, isLoading } = useDeleteCourse();

  const handleDelete = async (isConfirmed: boolean, id: string) => {
    if (isConfirmed) {
      await deleteCourse(id)
        .catch(error => console.error(error))
        .finally(() => setDeletingCourse(undefined));
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
      onClose={isConfirmed => handleDelete(isConfirmed, course.id)}
      title='Confirm deleting'
      message={`The course with title "${course.title}" will be removed from the system. After deleting a course, the lessons in it will also be deleted.`}
      confirmMessage='Delete'
    />
  );
};

export default DeleteCourseDialog;
