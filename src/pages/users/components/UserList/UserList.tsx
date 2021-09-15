import { Box, Stack, Text } from '@chakra-ui/layout';
import { IUser } from 'interfaces';
import React from 'react';
import UserItem from './UserItem';

type UserListPropsType = {
  users: IUser[];
};

const UserList: React.FC<UserListPropsType> = ({ users }) => {
  if (users.length === 0) {
    return (
      <Box textAlign='center'>
        <Text>There are no users in the system</Text>
      </Box>
    );
  }

  return (
    <Stack mt='4' spacing='2'>
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </Stack>
  );
};

export default UserList;
