import React from 'react';
import { observer } from 'mobx-react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Flex, Box, Stack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';

/**
 * Components
 */
import EditUserForm from '../EditUserForm';
import DeleteUserDialog from '../DeleteUserDialog';

/**
 * Types
 */
import type { IUser } from '@educt/interfaces';
import type { UsersPageContextType } from '@educt/types';
import type { UserItemPropsType } from './UserItem';

/**
 * Contexts
 */
import { UsersPageContext } from '@educt/contexts';

/**
 * Hooks
 */
import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import { useErrorHandler } from 'react-error-boundary';
import { useRootStore } from '@educt/hooks/useRootStore';
import { useDisclosure } from '@chakra-ui/hooks';

type UserListPropsType = { render: React.FC<UserItemPropsType> };

const UserList: React.FC<UserListPropsType> = ({ render: Item }) => {
  const { userStore } = useRootStore();
  const { searchingRole, loading, setLoading, search, editingUser, setEditingUser, deletingUser, setDeletingUser } =
    useContext<UsersPageContextType>(UsersPageContext);
  const location = useLocation();
  const handleError = useErrorHandler();
  const { onOpen: onOpenEditModal, onClose: onCloseEditModal, isOpen: isOpenEditModal } = useDisclosure();
  const { onOpen: onOpenDeleteDialog, onClose: onCloseDeleteDialog, isOpen: isOpenDeleteDialog } = useDisclosure();
  const { users, pagination } = userStore;

  useEffect(() => {
    userStore.loadUsersData().catch(error => handleError(error));
  }, [handleError, userStore, location.search]);

  if (pagination === undefined || users === null) return <div>Loading users...</div>;

  const pagesCount = Math.ceil(pagination.total / pagination.per_page);

  /**
   * Handle next page
   */
  const nextPage = async () => {
    try {
      setLoading(true);
      await userStore.loadUsersData({
        page: pagination.current_page + 1,
        limit: pagination.per_page,
        role: searchingRole,
        search,
      });
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle prev page
   */
  const prevPage = async () => {
    try {
      setLoading(true);
      await userStore.loadUsersData({
        page: pagination.current_page - 1,
        limit: pagination.per_page,
        role: searchingRole,
        search,
      });
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Set editing state when click on edit button
   * and open editing user form modal
   */
  const onEditUser = (user: IUser) => {
    setEditingUser(user);
    onOpenEditModal();
  };

  /**
   * Set deleting state when click on delete button
   * and open delete user dialog
   */
  const onDeleteUser = (user: IUser) => {
    setDeletingUser(user);
    onOpenDeleteDialog();
  };

  if (pagination.total === 0)
    return (
      <Box textAlign='center' mt='10' userSelect='none'>
        <Text color='gray.500'>Cannot find any users.</Text>
      </Box>
    );

  return (
    <>
      {editingUser && <EditUserForm onClose={onCloseEditModal} isOpen={isOpenEditModal} />}
      {deletingUser && <DeleteUserDialog onClose={onCloseDeleteDialog} isOpen={isOpenDeleteDialog} />}
      <Box>
        <Flex mt='7' p='0 10px' fontWeight='bold' alignItems='center' justifyContent='space-between'>
          <Text>Total: ({pagination.total})</Text>
          <Text>Actions</Text>
        </Flex>
        {loading ? (
          <Box textAlign='center' mt='10' userSelect='none'>
            <Text color='gray.500'>Wait a second...</Text>
          </Box>
        ) : (
          <Stack mt='4' spacing='2'>
            {users.map(user => (
              <Item key={user.id} user={user} onEdit={onEditUser} onDelete={onDeleteUser} />
            ))}
          </Stack>
        )}
      </Box>
      <Flex margin='2rem 0' flexDirection={{ base: 'column', sm: 'column', md: 'row' }}>
        <Box textAlign={{ base: 'center', sm: 'center', md: 'left' }} mb={{ base: '2', md: '0' }}>
          Page <b>{pagination.current_page}</b> of {pagesCount}
        </Box>
        <Flex ml='auto' mr='auto' alignItems='center' sx={{ gap: '30px' }}>
          <Button
            onClick={prevPage}
            disabled={pagination.current_page <= 1}
            variant='link'
            leftIcon={<ChevronLeftIcon />}
          >
            Previous page
          </Button>
          <Button
            onClick={nextPage}
            disabled={pagination.current_page === pagesCount}
            variant='link'
            rightIcon={<ChevronRightIcon />}
          >
            Next page
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default observer(UserList);
