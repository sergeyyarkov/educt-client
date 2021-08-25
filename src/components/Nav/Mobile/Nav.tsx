import React from 'react';
import { observer } from 'mobx-react';
import config from 'config';
import { Link } from 'react-router-dom';
import { useRootStore } from 'hooks/useRootStore';

import { Avatar } from '@chakra-ui/avatar';
import { Flex, Box, Text } from '@chakra-ui/layout';
import { Drawer, DrawerOverlay, DrawerContent, DrawerBody } from '@chakra-ui/modal';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useDisclosure, IconButton, useColorMode, Skeleton } from '@chakra-ui/react';
import NavLink from '../Desktop/NavLink';

const NavMobile: React.FC = () => {
  const { userStore } = useRootStore();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton aria-label='Navigation' icon={<HamburgerIcon />} onClick={onOpen} />
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent backgroundColor={colorMode === 'dark' ? 'gray.800' : 'white'}>
          <DrawerBody>
            <Flex as='nav' flexDirection='column' alignItems='flex-start' textDecoration='none'>
              {config.links.map((link, i) => (
                <NavLink link={link} key={i} onCloseDrawer={onClose} />
              ))}
            </Flex>
            {userStore.me ? (
              <Box
                position='absolute'
                bottom={0}
                right={0}
                left={0}
                minHeight='60px'
                padding='10px'
                margin='5'
                borderRadius='md'
                backgroundColor={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
              >
                <Flex alignItems='center'>
                  <Avatar size='sm' name={`${userStore.me.first_name} ${userStore.me.last_name}`} marginRight={3} />
                  <Flex flexDirection='column'>
                    <Text as='span' mr={2} lineHeight='1.2'>
                      {`${userStore.me.first_name} ${userStore.me.last_name}`}
                    </Text>
                    <Link to={`/profile`} style={{ fontSize: '13px', textDecoration: 'underline' }} onClick={onClose}>
                      View profile
                    </Link>
                  </Flex>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default observer(NavMobile);
