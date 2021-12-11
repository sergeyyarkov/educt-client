import React from 'react';
import { observer } from 'mobx-react';
import { Flex, Box } from '@chakra-ui/react';

/**
 * Components
 */
import Logo from '@educt/components/Logo';
import NavMobile from '@educt/components/Nav/Mobile';
import ColorModeSwitcher from '@educt/components/ColorModeSwitcher';
import ProfileMenu from './ProfileMenu';
import NotificationsMenu from './NotificationsMenu';

/**
 * Hooks
 */
import { useMediaQuery } from '@chakra-ui/media-query';
import { useColorModeValue } from '@chakra-ui/color-mode';

const Header: React.FC = () => {
  const [isDesktop] = useMediaQuery('(min-width: 992px)');

  return (
    <Box
      as='header'
      position='fixed'
      top={0}
      left={0}
      right={0}
      borderBottomWidth='1px'
      backgroundColor={useColorModeValue('white', 'gray.800')}
      zIndex={4}
    >
      <Flex
        justifyContent='space-between'
        width='100%'
        height='100%'
        alignItems='center'
        padding='5px 1.5rem 5px 1.5rem'
      >
        <Logo h='10' />
        {isDesktop && (
          <Flex>
            <ColorModeSwitcher />
            <NotificationsMenu />
            <ProfileMenu />
          </Flex>
        )}
        {!isDesktop && <NavMobile />}
      </Flex>
    </Box>
  );
};

export default observer(Header);
