import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { IconButton, Skeleton } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/avatar';
import { Flex, Box, Text } from '@chakra-ui/layout';
import { Drawer, DrawerOverlay, DrawerContent, DrawerBody } from '@chakra-ui/modal';
import { MdExitToApp } from 'react-icons/md';
import { HamburgerIcon } from '@chakra-ui/icons';
import config from '@educt/config';

/**
 * Components
 */
import NavList from '../NavList';
import Logo from '@educt/components/Logo';

/**
 * Hooks
 */
import { useLogout } from '@educt/hooks/queries';
import { useRootStore } from '@educt/hooks/useRootStore';
import { useColorMode, useDisclosure } from '@chakra-ui/react';

const NavMobile: React.FC = () => {
  const {
    userStore: { me },
  } = useRootStore();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useLogout();

  return (
    <>
      <IconButton aria-label='Navigation' icon={<HamburgerIcon />} onClick={onOpen} />
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent backgroundColor={colorMode === 'dark' ? 'gray.800' : 'white'}>
          <DrawerBody>
            <Flex flexDirection='column' height='100%'>
              <Box mt='2'>
                <Logo h='10' ml='2' />
              </Box>
              <Flex flexDir='column' mt='3' w='full'>
                <NavList links={config.links} onCloseDrawer={onClose} />
              </Flex>
              {me !== null ? (
                <Box
                  minHeight='60px'
                  padding='10px'
                  borderRadius='md'
                  marginTop='auto'
                  backgroundColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                >
                  <Flex alignItems='center'>
                    <Avatar size='sm' name={me.fullname} marginRight={3} />
                    <Flex flexDirection='column'>
                      <Text as='span' mr={2} lineHeight='1.2'>
                        {me.fullname}
                      </Text>
                      <Link to={`/profile`} style={{ fontSize: '13px', textDecoration: 'underline' }} onClick={onClose}>
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
