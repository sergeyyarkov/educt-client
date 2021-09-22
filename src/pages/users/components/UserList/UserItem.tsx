import React from 'react';
import * as helpres from 'helpers';
import { Box, Flex, Avatar, Text, IconButton } from '@chakra-ui/react';
import { MdMoreHoriz } from 'react-icons/md';
import UserBadge from 'components/UserBadge';

/**
 * Types
 */
import { IUser } from 'interfaces';
import { UserRoleEnum } from 'enums';

/**
 * Hooks
 */
import { useRootStore } from 'hooks/useRootStore';

type UserItemPropsType = {
  user: IUser;
  onEdit: (user: IUser) => void;
};

const UserItem: React.FC<UserItemPropsType> = ({ user, onEdit }) => {
  const {
    userStore: { me },
  } = useRootStore();

  /**
   * The user with role TEACHER can edit users with only STUDENT role
   */
  const isDisabledActions = () => {
    if (helpres.userContainRoles(user.roles, [UserRoleEnum.ADMIN, UserRoleEnum.TEACHER]) && me !== null) {
      /**
       * Disable editing
       */
      if (me.isTeacher || me.isStudent) {
        return true;
      } else return false;
    } else {
      return false;
    }
  };

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
          <IconButton
            disabled={isDisabledActions()}
            onClick={() => onEdit(user)}
            aria-label='Actions'
            variant='ghost'
            icon={<MdMoreHoriz />}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default UserItem;
