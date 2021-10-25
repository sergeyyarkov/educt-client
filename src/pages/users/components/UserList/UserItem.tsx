import React from 'react';
import * as helpres from '@educt/helpers';
import { Box, Flex, Avatar, Text, IconButton, Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import UserBadge from '@educt/components/UserBadge';

/**
 * Types
 */
import { IUser } from '@educt/interfaces';
import { UserRoleEnum } from '@educt/enums';

/**
 * Hooks
 */
import { useRootStore } from '@educt/hooks/useRootStore';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

type UserItemPropsType = {
  user: IUser;
  onEdit: (user: IUser) => void;
  onDelete: (user: IUser) => void;
};

const UserItem: React.FC<UserItemPropsType> = ({ user, onEdit, onDelete }) => {
  const {
    userStore: { me },
  } = useRootStore();

  const isDisabledActions = (() => {
    /**
     * Disable editing when rendering on account item
     */
    if (me !== null && me.id === user.id) return true;

    /**
     * Disable editing based on user roles
     */
    if (helpres.userContainRoles(user.roles, [UserRoleEnum.ADMIN, UserRoleEnum.TEACHER]) && me !== null) {
      if (me.isTeacher || me.isStudent) {
        return true;
      } else return false;
    } else {
      return false;
    }
  })();

  return (
    <Box borderWidth='1px' borderRadius='lg' w='full' p='3'>
      <Flex alignItems='center' justifyContent='space-between' sx={{ gap: '20px' }}>
        <Flex alignItems='center' flexBasis='230px'>
          <Avatar name={user.fullname} size='sm' mr='3' />
          <Box>
            <Link as={ReactRouterLink} to={`/user/${user.id}`} fontSize='md' fontWeight='medium'>
              {user.fullname}
            </Link>
            <Text fontSize='sm'>{user.email}</Text>
          </Box>
        </Flex>
        <Flex sx={{ gap: '5px' }}>
          <UserBadge roles={user.roles} />
        </Flex>
        <Box>
          <IconButton
            disabled={isDisabledActions}
            onClick={() => onEdit(user)}
            aria-label='Edit'
            variant='ghost'
            mr={1}
            icon={<EditIcon />}
          />
          <IconButton
            disabled={isDisabledActions}
            onClick={() => onDelete(user)}
            colorScheme='red'
            aria-label='Delete'
            variant='ghost'
            icon={<DeleteIcon />}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default UserItem;
