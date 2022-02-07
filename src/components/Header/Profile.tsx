import React from 'react';
import {
  Menu,
  MenuGroup,
  MenuList,
  MenuDivider,
  MenuButton,
  MenuItem,
  Button,
  Flex,
  Box,
  Avatar,
  Text,
  Skeleton,
} from '@chakra-ui/react';
import { MdSettings, MdExitToApp } from 'react-icons/md';
import { observer } from 'mobx-react';
import { useRootStore } from '@educt/hooks/useRootStore';
import { Link } from 'react-router-dom';
import UserBadge from '@educt/components/UserBadge';

/**
 * Hooks
 */
import { useLogout } from '@educt/hooks/queries';

const Profile: React.FC = observer(() => {
  const {
    userStore: { me },
  } = useRootStore();
  const { logout } = useLogout();

  if (me === null) {
    return <Skeleton width='260px' height='40px' borderRadius='md' />;
  }

  return (
    <Flex alignItems='center'>
      <Menu>
        <MenuButton as={Button} pr={6}>
          <Flex alignItems='center'>
            <Avatar size='sm' name={me.fullname} marginRight={3} />
            <Text as='span' mr={2}>
              {me.fullname}
            </Text>
            <UserBadge roles={me.roles} />
          </Flex>
        </MenuButton>
        <MenuList mr='1rem'>
          <MenuGroup title={me.fullname}>
            <MenuDivider />
            <Link to='/profile'>
              <MenuItem>
                <Box as={MdSettings} mr={2} />
                My profile
              </MenuItem>
            </Link>
            <MenuItem onClick={logout}>
              <Box as={MdExitToApp} mr={2} />
              Logout
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
});

export { Profile };
