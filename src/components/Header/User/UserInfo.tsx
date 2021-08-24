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
  useToast,
  Skeleton,
} from '@chakra-ui/react';
import { MdSettings, MdExitToApp } from 'react-icons/md';
import { observer } from 'mobx-react';
import { useRootStore } from '../../../hooks/useRootStore';
import { useHistory, Link } from 'react-router-dom';

const UserInfo: React.FC = () => {
  const { authStore, userStore } = useRootStore();
  const history = useHistory();
  const toast = useToast();

  const onLogoutHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      await authStore.logout();
      history.push('/auth');
      toast({ title: 'You are logged out.', isClosable: true, status: 'info' });
    } catch (error) {
      console.error(error);
    }
  };

  if (userStore.me === null) {
    return <Skeleton width='160px' borderRadius='md' />;
  }

  return (
    <Flex alignItems='center'>
      <Menu>
        <MenuButton as={Button} pr={6}>
          <Flex alignItems='center'>
            <Avatar size='sm' name='user name' marginRight={3} />
            <Text as='span' mr={2}>
              {`${userStore.me.first_name} ${userStore.me.last_name}`}
            </Text>
          </Flex>
        </MenuButton>
        <MenuList mr='1rem'>
          <MenuGroup title={`${userStore.me.first_name} ${userStore.me.last_name}`}>
            <MenuDivider />
            <Link to='/profile'>
              <MenuItem>
                <Box as={MdSettings} mr={2} />
                My profile
              </MenuItem>
            </Link>
            <MenuItem onClick={onLogoutHandler}>
              <Box as={MdExitToApp} mr={2} />
              Logout
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default observer(UserInfo);
