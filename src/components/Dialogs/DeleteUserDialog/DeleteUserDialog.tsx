import React from 'react';

/**
 * Types
 */
import { IUser } from '@educt/interfaces';

/**
 * Components
 */
import ConfirmDialog from '@educt/components/ConfirmDialog/ConfirmDialog';

/**
 * Contexts
 */
import { UsersPageContext } from '@educt/contexts';

/**
 * Hooks
 */
import { useContext } from 'react';
import { useRootStore } from '@educt/hooks/useRootStore';
import { useDeleteUser } from '@educt/hooks/queries';

type DeleteUserDialogPropsType = {
  user: Pick<IUser, 'id' | 'fullname'>;
  isOpen: boolean;
  onClose: () => void;
};

const DeleteUserDialog: React.FC<DeleteUserDialogPropsType> = ({ isOpen, onClose, user }) => {
  const { userStore } = useRootStore();
  const { searchingRole, searchingPage, search } = useContext(UsersPageContext);
  const { deleteUser, isLoading } = useDeleteUser();

  const { pagination } = userStore;

  /**
   * Delete user handler
   *
   * @param isConfirmed Is dialog confirmed
   * @param id User id
   */
  const deleteUserHandler = async (isConfirmed: boolean, id: string) => {
    if (isConfirmed) {
      try {
        await deleteUser(id, {
          page: searchingPage,
          limit: pagination?.per_page,
          role: searchingRole,
          search,
        });
      } catch (error) {
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
      onClose={isConfirmed => deleteUserHandler(isConfirmed, user.id)}
      title='Confirm deleting'
      message={`The user named "${user.fullname}" will be removed from the system.`}
      confirmMessage='Delete'
    />
  );
};

export default DeleteUserDialog;
