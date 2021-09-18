import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Flex, Box, Stack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { IPaginationMeta, IUser } from 'interfaces';
import React, { useContext } from 'react';
import UserItem from './UserItem';
import { useRootStore } from 'hooks/useRootStore';
import { useErrorHandler } from 'react-error-boundary';
import { UsersPageContextType } from 'types';
import { UsersPageContext } from 'contexts';

type UserListPropsType = {
  users: IUser[];
  pagination: IPaginationMeta;
};

const UserList: React.FC<UserListPropsType> = ({ users, pagination }) => {
  const { userStore } = useRootStore();
  const { searchingRole, loading, setLoading, search } = useContext<UsersPageContextType>(UsersPageContext);
  const handleError = useErrorHandler();
  const pagesCount = Math.ceil(pagination.total / pagination.per_page);

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

  return (
    <>
      {pagination.total !== 0 ? (
        <>
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
                  <UserItem key={user.id} user={user} />
                ))}
              </Stack>
            )}
          </Box>
          <Flex mt='auto' mb='16' flexDirection={{ base: 'column', sm: 'column', md: 'row' }}>
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
      ) : (
        <Box textAlign='center' mt='10' userSelect='none'>
          <Text color='gray.500'>Cannot find any users.</Text>
        </Box>
      )}
    </>
  );
};

export default UserList;
