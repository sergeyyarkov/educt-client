import React from 'react';
import { Flex } from '@chakra-ui/layout';
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody } from '@chakra-ui/modal';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useDisclosure, IconButton } from '@chakra-ui/react';
import config from '../../../config';
import NavLink from '../Desktop/NavLink';

const NavMobile: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton aria-label='Navigation' icon={<HamburgerIcon />} onClick={onOpen} />
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Navigation</DrawerHeader>
          <DrawerBody>
            <Flex as='nav' flexDirection='column' alignItems='flex-start' textDecoration='none'>
              {config.links.map((link, i) => (
                <NavLink link={link} key={i} onCloseDrawer={onClose} />
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavMobile;
