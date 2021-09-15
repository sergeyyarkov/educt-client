import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Select } from '@chakra-ui/react';
import { Box, Flex, Text, Button, Heading } from '@chakra-ui/react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { AddIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@chakra-ui/icons';
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
 *Hooks
 */
import { useRootStore } from 'hooks/useRootStore';
import { useErrorHandler } from 'react-error-boundary';

/**
 * Users Page
 */
const UsersPage: React.FC<IPageProps> = ({ title }) => {
  const { userStore } = useRootStore();
  const handleError = useErrorHandler();

  useEffect(() => {
    userStore.loadUsersData().catch(error => handleError(error));
  }, [handleError, userStore]);

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
          <Box>
            <Flex mt='7' p='0 10px' fontWeight='bold' alignItems='center' justifyContent='space-between'>
              <Text>Total users: ({userStore.users.length})</Text>
              <Text>Actions</Text>
            </Flex>
            <UserList users={userStore.users} />
          </Box>
          <Flex mt='auto' mb='16' flexDirection={{ base: 'column', sm: 'column', md: 'row' }}>
            <Box textAlign={{ base: 'center', sm: 'center', md: 'left' }} mb={{ base: '2', md: '0' }}>
              Page <b>1</b> of 23
            </Box>
            <Flex ml='auto' mr='auto' alignItems='center' sx={{ gap: '30px' }}>
              <Button variant='link' leftIcon={<ChevronLeftIcon />}>
                Previous page
              </Button>
              <Button variant='link' rightIcon={<ChevronRightIcon />}>
                Next page
              </Button>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <LoadingPage />
      )}
    </Box>
  );
};

export default observer(UsersPage);
