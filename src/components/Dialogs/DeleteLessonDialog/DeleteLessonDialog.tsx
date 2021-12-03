import React from 'react';

/**
 * Types
 */
import { ILesson } from '@educt/interfaces';

/**
 * Components
 */
import ConfirmDialog from '@educt/components/ConfirmDialog/ConfirmDialog';

/**
 * Hooks
 */
import { useDeleteLesson } from '@educt/hooks/queries';

type DeleteLessonDialogPropsType = {
  lesson: Pick<ILesson, 'id' | 'title'>;
  isOpen: boolean;
  onClose: () => void;
};

const DeleteLessonDialog: React.FC<DeleteLessonDialogPropsType> = ({ lesson, isOpen, onClose }) => {
  const { deleteLesson, isLoading } = useDeleteLesson();

  const handleDelete = async (isConfirmed: boolean) => {
    if (isConfirmed) {
      try {
        await deleteLesson(lesson.id);
      } catch (error: any) {
        console.error(error);
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
      onClose={isConfirmed => handleDelete(isConfirmed)}
      title='Confirm deleting'
      message={`Lesson with will be removed from the course. Attached materials will also be removed.`}
      confirmMessage='Delete'
    />
  );
};

export default DeleteLessonDialog;
