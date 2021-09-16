import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Flex, Box, Stack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { IPaginationMeta, IUser } from 'interfaces';
import React, { useState } from 'react';
import UserItem from './UserItem';
import { useRootStore } from 'hooks/useRootStore';
import { useErrorHandler } from 'react-error-boundary';

type UserListPropsType = {
  users: IUser[];
  pagination: IPaginationMeta;
};

const UserList: React.FC<UserListPropsType> = ({ users, pagination }) => {
  const { userStore } = useRootStore();
  const handleError = useErrorHandler();
  const [loading, setLoading] = useState<boolean>(false);
  const pagesCount = Math.round(pagination.total / pagination.per_page);
  const [pages] = useState<number>(pagesCount < 1 ? 1 : pagesCount);
  const [currentPage, setCurrentPage] = useState<number>(pagination.current_page);

  const nextPage = async () => {
    if (currentPage === pages) return;
    try {
      setLoading(true);
      await userStore.loadUsersData({
        page: currentPage + 1,
        limit: pagination.per_page,
      });
      setCurrentPage(p => p + 1);
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const prevPage = async () => {
    if (currentPage <= 1) return;
    try {
      setLoading(true);
      await userStore.loadUsersData({
        page: currentPage - 1,
        limit: pagination.per_page,
      });
      setCurrentPage(p => p - 1);
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  if (pagination.total === 0) {
    return (
      <Box textAlign='center' mt='10' userSelect='none'>
        <Text color='gray.500'>There are no users in the system</Text>
      </Box>
    );
  }

  return (
    <>
      <Box>
        <Flex mt='7' p='0 10px' fontWeight='bold' alignItems='center' justifyContent='space-between'>
          <Text>Total users: ({pagination.total})</Text>
          <Text>Actions</Text>
        </Flex>
        {loading ? (
          <Box textAlign='center' mt='10' userSelect='none'>
            <Text color='gray.500'>Wait a second...</Text>
          </Box>
        ) : (
          <Stack mt='4' spacing='2'>
            {users.map(user => (
              <UserItem key={user.id} user={user} />
            ))}
          </Stack>
        )}
      </Box>
      <Flex mt='auto' mb='16' flexDirection={{ base: 'column', sm: 'column', md: 'row' }}>
        <Box textAlign={{ base: 'center', sm: 'center', md: 'left' }} mb={{ base: '2', md: '0' }}>
          Page <b>{currentPage}</b> of {pages}
        </Box>
        <Flex ml='auto' mr='auto' alignItems='center' sx={{ gap: '30px' }}>
          <Button onClick={prevPage} disabled={currentPage <= 1} variant='link' leftIcon={<ChevronLeftIcon />}>
            Previous page
          </Button>
          <Button onClick={nextPage} disabled={currentPage === pages} variant='link' rightIcon={<ChevronRightIcon />}>
            Next page
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default UserList;
