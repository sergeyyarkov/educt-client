import React from 'react';
import { observer } from 'mobx-react';
import { MdExitToApp } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useRootStore } from 'hooks/useRootStore';
import { Avatar } from '@chakra-ui/avatar';
import { Flex, Box, Text } from '@chakra-ui/layout';
import { Drawer, DrawerOverlay, DrawerContent, DrawerBody } from '@chakra-ui/modal';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useDisclosure, IconButton, useColorMode, Skeleton } from '@chakra-ui/react';
import NavList from '../NavList';
import config from 'config';
import useLogoutQuery from 'hooks/useLogoutQuery';

const NavMobile: React.FC = () => {
  const { userStore } = useRootStore();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useLogoutQuery();

  return (
    <>
      <IconButton aria-label='Navigation' icon={<HamburgerIcon />} onClick={onOpen} />
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent backgroundColor={colorMode === 'dark' ? 'gray.800' : 'white'}>
          <DrawerBody>
            <Flex flexDirection='column' height='100%'>
              <Flex as='nav' flexDirection='column' alignItems='flex-start' textDecoration='none' mb='20px'>
                <NavList links={config.links} onCloseDrawer={onClose} />
              </Flex>
              {userStore.me ? (
                <Box pb='10px'>
                  <Box
                    minHeight='60px'
                    padding='10px'
                    borderRadius='md'
                    marginTop='auto'
                    backgroundColor={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
                  >
                    <Flex alignItems='center'>
                      <Avatar size='sm' name={`${userStore.me.first_name} ${userStore.me.last_name}`} marginRight={3} />
                      <Flex flexDirection='column'>
                        <Text as='span' mr={2} lineHeight='1.2'>
                          {`${userStore.me.first_name} ${userStore.me.last_name}`}
                        </Text>
                        <Link
                          to={`/profile`}
                          style={{ fontSize: '13px', textDecoration: 'underline' }}
                          onClick={onClose}
                        >
                          View profile
                        </Link>
                      </Flex>
                      <IconButton
                        onClick={logout}
                        aria-label='Logout'
                        backgroundColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                        marginLeft='auto'
                        icon={<MdExitToApp />}
                      />
                    </Flex>
                  </Box>
                </Box>
              ) : (
                <Skeleton
                  h='60px'
                  position='absolute'
                  borderRadius='md'
                  bottom={0}
                  right={0}
                  left={0}
                  padding='10px'
                  margin='5'
                />
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default observer(NavMobile);
