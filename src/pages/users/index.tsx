import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Select } from '@chakra-ui/react';
import { Box, Flex, Button, Heading } from '@chakra-ui/react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import { FaFileExcel } from 'react-icons/fa';

/**
 * Types
 */
import { IPageProps } from 'interfaces';

/**
 * Components
 */
import UserList from './components/UserList';
import LoadingPage from './components/LoadingPage';

/**
 * Hooks
 */
import { useRootStore } from 'hooks/useRootStore';
import { useErrorHandler } from 'react-error-boundary';
import { useLocation } from 'react-router';

/**
 * Users Page
 */
const UsersPage: React.FC<IPageProps> = ({ title }) => {
  const { userStore } = useRootStore();
  const handleError = useErrorHandler();
  const location = useLocation();

  useEffect(() => {
    userStore.loadUsersData({ page: 1, limit: 2 }).catch(error => handleError(error));
  }, [handleError, userStore, location.search]);

  return (
    <Box h='full'>
      <Heading as='h1'>User management</Heading>
      {userStore.users !== null ? (
        <Flex mt='5' flexDir='column' h='full'>
          <Flex justifyContent='space-between' sx={{ gap: '10px' }} flexWrap='wrap'>
            <Flex flexBasis='600px'>
              <Select defaultValue='any' w='full' mr='2'>
                <option value='any'>Any role</option>
                <option value='administrator'>Administrator</option>
                <option value='teacher'>Teacher</option>
                <option value='student'>Student</option>
              </Select>
              <InputGroup maxW='400px' w='full'>
                <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.300' />} />
                <Input placeholder='Search for a user...' />
              </InputGroup>
            </Flex>
            <Flex sx={{ gap: '10px' }}>
              <Button variant='outline' color='blue.500' leftIcon={<AddIcon />}>
                Create new
              </Button>
              <Button variant='outline' colorScheme='green' leftIcon={<FaFileExcel />}>
                Import
              </Button>
            </Flex>
          </Flex>
          {userStore.users.meta.pagination && (
            <UserList users={userStore.users.data} pagination={userStore.users.meta.pagination} />
          )}
        </Flex>
      ) : (
        <LoadingPage />
      )}
    </Box>
  );
};

export default observer(UsersPage);
