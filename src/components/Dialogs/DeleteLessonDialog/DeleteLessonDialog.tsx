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
import { useRootStore } from '@educt/hooks/useRootStore';

type DeleteLessonDialogPropsType = {
  isOpen: boolean;
  onClose: () => void;
};

const DeleteLessonDialog: React.FC<DeleteLessonDialogPropsType> = ({ isOpen, onClose }) => {
  const {
    pageStore: {
      editCourseStore: { deletingLesson },
    },
  } = useRootStore();
  const { deleteLesson, isLoading } = useDeleteLesson();

  const handleDelete = async (isConfirmed: boolean) => {
    if (isConfirmed && deletingLesson) {
      await deleteLesson(deletingLesson.id);
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
      message={`Lesson with title will be removed from the course. Attached materials will also be removed.`}
      confirmMessage='Delete'
    />
  );
};

export default DeleteLessonDialog;
