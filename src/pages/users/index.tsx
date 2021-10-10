import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

/**
 * Types
 */
import { IPageProps } from 'interfaces';

/**
 * Components
 */
import UserSearch from './components/UserSearch';
import UserList from './components/UserList';
import LoadingPage from './components/LoadingPage';

/**
 * Hooks
 */
import { useRootStore } from 'hooks/useRootStore';
import { useErrorHandler } from 'react-error-boundary';
import { useLocation } from 'react-router';

/**
 * Context
 */
import CreateUserForm from './components/CreateUserForm';
import { UsersPageContextProvider } from 'providers';

/**
 * Users Page
 */
const UsersPage: React.FC<IPageProps> = () => {
  const { userStore } = useRootStore();
  const handleError = useErrorHandler();
  const location = useLocation();

  useEffect(() => {
    userStore.loadUsersData().catch(error => handleError(error));
  }, [handleError, userStore, location.search]);

  return (
    <UsersPageContextProvider>
      <Box h='100%'>
        <Heading as='h1'>User management</Heading>
        <Text mt='2'>You can add or delete users on this page.</Text>
        {userStore.users !== null && userStore.me !== null && userStore.pagination !== undefined ? (
          <Flex mt='5' flexDir='column' h='full'>
            <Flex justifyContent='space-between' sx={{ gap: '10px' }} flexWrap='wrap'>
              <UserSearch />
              <Flex sx={{ gap: '10px' }}>
                <CreateUserForm me={userStore.me} />
              </Flex>
            </Flex>
            <UserList users={userStore.users} pagination={userStore.pagination} />
          </Flex>
        ) : (
          <LoadingPage />
        )}
      </Box>
    </UsersPageContextProvider>
  );
};

export default observer(UsersPage);
