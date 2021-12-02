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
import { useContext, useState } from 'react';
import { useRootStore } from '@educt/hooks/useRootStore';
import { useToast } from '@chakra-ui/react';
import { useErrorHandler } from 'react-error-boundary';

type DeleteUserDialogPropsType = {
  user: IUser;
  isOpen: boolean;
  onClose: () => void;
};

const DeleteUserDialog: React.FC<DeleteUserDialogPropsType> = ({ isOpen, onClose, user }) => {
  const { userStore } = useRootStore();
  const { setDeletingUser, searchingRole, searchingPage, search } = useContext(UsersPageContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleError = useErrorHandler();
  const toast = useToast();

  const { pagination } = userStore;

  /**
   * Delete user handler
   *
   * @param isConfirmed Is dialog confirmed
   * @param id User id
   */
  // TODO: move to hook
  const deleteUserHandler = async (isConfirmed: boolean, id: string) => {
    if (isConfirmed) {
      try {
        setIsLoading(true);
        await userStore.deleteUser(id, {
          page: searchingPage,
          limit: pagination?.per_page,
          role: searchingRole,
          search,
        });
        toast({ title: 'User deleted.', status: 'info' });
      } catch (error: any) {
        if (error.response) {
          toast({ title: error.message, status: 'error' });
        } else {
          handleError(error);
        }
      } finally {
        setIsLoading(false);
        setDeletingUser(undefined);
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
