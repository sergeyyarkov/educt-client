import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Flex, Box, Stack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';

/**
 * Components
 */
import LoadingList from '@educt/components/LoadingList';
import EditUserModal from '@educt/components/Modals/EditUserModal';
import DeleteUserDialog from '@educt/components/Dialogs/DeleteUserDialog';

/**
 * Types
 */
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
import { useErrorHandler } from 'react-error-boundary';
import { useRootStore } from '@educt/hooks/useRootStore';
import { useDisclosure } from '@chakra-ui/hooks';
import { IUser } from '@educt/interfaces';
import UserSearch from '../UserSearch';
import CreateUserForm from '../CreateUserForm';

type UserListPropsType = { render: React.FC<UserItemPropsType>; limit?: number };

const UserList: React.FC<UserListPropsType> = ({ render: Item, limit }) => {
  const { userStore } = useRootStore();
  const { searchingRole, search, searchingPage, setSearchingPage } = useContext<UsersPageContextType>(UsersPageContext);
  const handleError = useErrorHandler();
  const [deleting, setDeleting] = useState<Pick<IUser, 'id' | 'fullname'> | null>(null);
  const [editing, setEditing] = useState<IUser | null>(null);
  const { onOpen: onOpenEditModal, onClose: onCloseEditModal, isOpen: isOpenEditModal } = useDisclosure();
  const { onOpen: onOpenDeleteDialog, onClose: onCloseDeleteDialog, isOpen: isOpenDeleteDialog } = useDisclosure();
  const { users, pagination, me, isLoading } = userStore;

  const handleEditUser = (user: IUser) => {
    setEditing(user);
    onOpenEditModal();
  };
  const handleDeleteUser = (user: Pick<IUser, 'id' | 'fullname'>) => {
    setDeleting(user);
    onOpenDeleteDialog();
  };

  /**
   * Fetch users handler
   */
  useEffect(() => {
    userStore
      .loadUsersData({
        page: searchingPage,
        limit: limit || pagination?.per_page,
        search,
        role: searchingRole,
      })
      .catch(error => handleError(error));
  }, [handleError, userStore, search, searchingRole, searchingPage]);

  if (pagination === undefined || users === null || me === null) return <LoadingList />;

  const pagesCount = Math.ceil(pagination.total / pagination.per_page);

  return (
    <Box>
      {editing && <EditUserModal user={editing} isOpen={isOpenEditModal} onClose={onCloseEditModal} />}
      {deleting && <DeleteUserDialog user={deleting} isOpen={isOpenDeleteDialog} onClose={onCloseDeleteDialog} />}

      <Flex justifyContent='space-between' sx={{ gap: '10px' }} flexWrap='wrap'>
        <UserSearch />
        <CreateUserForm />
      </Flex>
      <Box>
        <Flex mt='5' p='0 10px' fontWeight='bold' alignItems='center' justifyContent='space-between'>
          <Text>Total: ({pagination.total})</Text>
          <Text>Actions</Text>
        </Flex>
        {!isLoading ? (
          <Stack mt='4' spacing='2'>
            {users.map(user => (
              <Item
                key={user.id}
                user={user}
                onEdit={user => handleEditUser(user)}
                onDelete={user => handleDeleteUser({ id: user.id, fullname: user.fullname })}
              />
            ))}
          </Stack>
        ) : (
          <LoadingList />
        )}
      </Box>
      {users.length === 0 && (
        <Box textAlign='center' userSelect='none'>
          <Text color='gray.500'>Cannot find any users.</Text>
        </Box>
      )}
      <Flex margin='2rem 0' flexDirection={{ base: 'column', sm: 'column', md: 'row' }}>
        <Box textAlign={{ base: 'center', sm: 'center', md: 'left' }} mb={{ base: '2', md: '0' }}>
          <Text fontSize='sm'>
            Page <b>{pagination.current_page}</b> of {pagesCount}
          </Text>
        </Box>
        <Flex ml='auto' mr='auto' justifyContent='center' flexWrap='wrap' alignItems='center' sx={{ gap: '30px' }}>
          <Button
            onClick={() => setSearchingPage(prevP => prevP - 1)}
            disabled={pagination.current_page <= 1}
            variant='link'
            leftIcon={<ChevronLeftIcon />}
          >
            Previous page
          </Button>
          <Button
            onClick={() => setSearchingPage(prevP => prevP + 1)}
            disabled={pagination.current_page === pagesCount}
            variant='link'
            rightIcon={<ChevronRightIcon />}
          >
            Next page
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default observer(UserList);
