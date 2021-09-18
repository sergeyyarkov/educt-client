import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Box, Flex, Button, Heading, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { FaFileExcel } from 'react-icons/fa';

/**
 * Types
 */
import { IPageProps } from 'interfaces';
import { SearchingRoleStateType } from 'types';

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
import { UsersPageContext } from 'contexts';

/**
 * Users Page
 */
const UsersPage: React.FC<IPageProps> = ({ title }) => {
  const { userStore } = useRootStore();
  const [searchingRole, setSearchingRole] = useState<SearchingRoleStateType>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const handleError = useErrorHandler();
  const location = useLocation();

  useEffect(() => {
    userStore.loadUsersData().catch(error => handleError(error));
  }, [handleError, userStore, location.search]);

  return (
    <UsersPageContext.Provider value={{ searchingRole, setSearchingRole, loading, setLoading }}>
      <Box h='full'>
        <Heading as='h1'>User management</Heading>
        <Text mt='2'>You can add or delete your users on this page.</Text>
        {userStore.users !== null ? (
          <Flex mt='5' flexDir='column' h='full'>
            <Flex justifyContent='space-between' sx={{ gap: '10px' }} flexWrap='wrap'>
              <UserSearch />
              <Flex sx={{ gap: '10px' }}>
                <Button variant='outline' color='blue.500' leftIcon={<AddIcon />}>
                  Create new
                </Button>
                <Button variant='outline' colorScheme='green' leftIcon={<FaFileExcel />}>
                  Import
                </Button>
              </Flex>
            </Flex>
            {userStore.pagination && <UserList users={userStore.users} pagination={userStore.pagination} />}
          </Flex>
        ) : (
          <LoadingPage />
        )}
      </Box>
    </UsersPageContext.Provider>
  );
};

export default observer(UsersPage);
