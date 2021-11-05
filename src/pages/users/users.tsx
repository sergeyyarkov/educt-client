import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

/**
 * Components
 */
import LoadingPage from '@educt/components/LoadingPage';
import UserSearch from './components/UserSearch';
import UserList from './components/UserList';
import UserItem from './components/UserList/UserItem';
import CreateUserForm from './components/CreateUserForm';

/**
 * Hooks
 */
import { useRootStore } from '@educt/hooks/useRootStore';

/**
 * Context
 */
import { UsersPageContextProvider } from '@educt/providers';

/**
 * Users Page
 */
const UsersPage: React.FC<IPageProps> = () => {
  const {
    userStore: { me },
  } = useRootStore();

  if (me === null) return <LoadingPage />;

  return (
    <UsersPageContextProvider>
      <Box h='100%'>
        <Heading as='h1'>User management</Heading>
        <Text mt='2'>You can add or delete users on this page.</Text>
        <Flex mt='5' flexDir='column' h='full'>
          <Flex justifyContent='space-between' sx={{ gap: '10px' }} flexWrap='wrap'>
            <UserSearch />
            <CreateUserForm me={me} />
          </Flex>
          <UserList render={UserItem} />
        </Flex>
      </Box>
    </UsersPageContextProvider>
  );
};

export default UsersPage;
