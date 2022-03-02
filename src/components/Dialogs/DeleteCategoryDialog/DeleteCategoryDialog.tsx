import React from 'react';
import ConfirmDialog from '@educt/components/ConfirmDialog';
import { ICategory } from '@educt/interfaces';
import useIsMountedRef from '@educt/hooks/useIsMountedRef';
import { useDeleteCategory } from '@educt/hooks/queries';

type DeleteCategoryDialogPropsType = {
  category: ICategory;
  isOpen: boolean;
  onClose: () => void;
  onDeleted?: (category: ICategory) => void | undefined;
};

const DeleteCategoryDialog: React.FC<DeleteCategoryDialogPropsType> = ({ onClose, onDeleted, isOpen, category }) => {
  const { deleteCategory, isLoading } = useDeleteCategory();
  const isMountedRef = useIsMountedRef();
  const handleDelete = async (isConfirmed: boolean, id: string) => {
    if (isConfirmed) {
      try {
        await deleteCategory(id);
        onDeleted && onDeleted(category);
      } catch (error) {
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
      onClose={isConfirmed => handleDelete(isConfirmed, category.id)}
      title='Confirm deleting'
      message={`The category with title "${category.title}" will be removed from the system. After deleting a category, the courses in it will also be deleted.`}
      confirmMessage='Delete'
    />
  );
};

export default DeleteCategoryDialog;
