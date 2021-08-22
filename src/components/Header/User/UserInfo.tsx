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
  Link,
} from '@chakra-ui/react';
import { MdSettings, MdExitToApp } from 'react-icons/md';
import { observer } from 'mobx-react';
import { useRootStore } from '../../../hooks/useRootStore';
import { useHistory } from 'react-router-dom';

const UserInfo: React.FC = () => {
  const { authStore } = useRootStore();
  const history = useHistory();

  const onLogoutHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      await authStore.logout();
      history.push('/auth');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex alignItems='center'>
      <Menu>
        <MenuButton as={Button} pr={6}>
          <Flex alignItems='center'>
            <Avatar size='sm' name='user name' marginRight={3} />
            <Text as='span' mr={2}>
              Username
            </Text>
          </Flex>
        </MenuButton>
        <MenuList mr='1rem'>
          <MenuGroup title='User fullname'>
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
