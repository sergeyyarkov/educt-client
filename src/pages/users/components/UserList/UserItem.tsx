import React from 'react';
import { Box, Flex, Avatar, Text, Tooltip, IconButton } from '@chakra-ui/react';
import { MdMoreHoriz } from 'react-icons/md';
import UserBadge from 'components/UserBadge';
import { IUser } from 'interfaces';

type UserItemPropsType = {
  user: IUser;
};

const UserItem: React.FC<UserItemPropsType> = ({ user }) => {
  return (
    <Box borderWidth='1px' borderRadius='lg' w='full' p='3'>
      <Flex alignItems='center' justifyContent='space-between' sx={{ gap: '20px' }}>
        <Flex alignItems='center' flexBasis='230px'>
          <Avatar name={`${user.first_name} ${user.last_name}`} size='sm' mr='3' />
          <Box>
            <Text fontSize='md' fontWeight='medium'>
              {user.first_name}&nbsp;{user.last_name}
            </Text>
            <Text fontSize='sm'>{user.email}</Text>
          </Box>
        </Flex>
        <Flex sx={{ gap: '5px' }}>
          <UserBadge roles={user.roles} />
        </Flex>
        <Box>
          <Tooltip label='Edit user' openDelay={400}>
            <IconButton aria-label='Actions' variant='ghost' icon={<MdMoreHoriz />} />
          </Tooltip>
        </Box>
      </Flex>
    </Box>
  );
};

export default UserItem;
