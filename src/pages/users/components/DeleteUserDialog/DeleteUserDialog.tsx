import React, { useContext, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { UsersPageContext } from 'contexts';

/**
 * Hooks
 */
import { useRootStore } from 'hooks/useRootStore';
import useIsMountedRef from 'hooks/useIsMountedRef';
import { useToast } from '@chakra-ui/react';
import { useErrorHandler } from 'react-error-boundary';

type DeleteUserDialogPropsType = {
  onClose: () => void;
  isOpen: boolean;
};

const DeleteUserDialog: React.FC<DeleteUserDialogPropsType> = ({ onClose, isOpen }) => {
  const { userStore } = useRootStore();
  const { deletingUser, setDeletingUser, searchingRole, search } = useContext(UsersPageContext);
  const isMountedRef = useIsMountedRef();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const handleError = useErrorHandler();
  const toast = useToast();

  /**
   * Delete user handler
   */
  const onDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await userStore.deleteUser(id, {
        page: userStore.pagination?.current_page,
        limit: userStore.pagination?.per_page,
        role: searchingRole,
        search,
      });
      toast({ title: 'User deleted.', status: 'info' });
      onClose();
      setDeletingUser(undefined);
    } catch (error: any) {
      if (error.response) {
        toast({ title: error.message, status: 'error' });
      } else {
        handleError(error);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  };

  if (deletingUser === undefined) return null;

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Confirm deleting
            </AlertDialogHeader>
            <AlertDialogBody>
              The user named "{deletingUser.first_name}&nbsp;{deletingUser.last_name}" will be removed from the system.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  setDeletingUser(undefined);
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme='red'
                isLoading={isLoading}
                loadingText='Deleting...'
                onClick={() => onDelete(deletingUser.id)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteUserDialog;
