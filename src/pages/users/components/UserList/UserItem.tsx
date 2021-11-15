import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import * as helpres from '@educt/helpers';
import { Box, Flex, Avatar, Text, IconButton, Link } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

/**
 * Types
 */
import { IUser } from '@educt/interfaces';
import { UserRoleEnum } from '@educt/enums';

/**
 * Components
 */
import UserBadge from '@educt/components/UserBadge';

/**
 * Hooks
 */
import { useRootStore } from '@educt/hooks/useRootStore';
import { useColorModeValue } from '@chakra-ui/react';

export type UserItemPropsType = {
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
    <Box borderBottomWidth='1px' borderRadius='lg' w='full' p='3' bg={useColorModeValue('gray.50', 'gray.700')}>
      <Flex flexDir={{ base: 'column', sm: 'row' }} alignItems='center' sx={{ gap: '20px' }}>
        <Flex alignItems='center' flexDir={{ base: 'column', sm: 'row' }} flex='1 1 0'>
          <Avatar name={user.fullname} size='sm' mr={{ base: '0', sm: '3' }} mb={{ base: '1', sm: '0' }} />
          <Box textAlign={{ base: 'center', sm: 'left' }}>
            <Link as={ReactRouterLink} to={`/user/${user.id}`} fontSize='md' fontWeight='medium'>
              {user.fullname}
            </Link>
            <Text fontSize='sm' overflowWrap='anywhere'>
              {user.email}
            </Text>
          </Box>
        </Flex>
        <Flex sx={{ gap: '5px' }} justifyContent='center' flex='1 1 0'>
          <UserBadge roles={user.roles} />
        </Flex>
        <Box>
          <IconButton
            size='sm'
            disabled={isDisabledActions}
            onClick={() => onEdit(user)}
            aria-label='Edit'
            variant='ghost'
            mr={1}
            icon={<EditIcon />}
          />
          <IconButton
            size='sm'
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
