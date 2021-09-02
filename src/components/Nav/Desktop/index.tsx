import config from 'config';
import React from 'react';
import { observer } from 'mobx-react';
import { Flex, Box, useColorMode } from '@chakra-ui/react';
import { useRootStore } from 'hooks/useRootStore';
import NavList from '../NavList';

/**
 *
 * Nav component
 * Component for navigating the application.
 */
const Nav: React.FC = () => {
  const {
    uiStore: { isDesktop },
  } = useRootStore();
  const { colorMode } = useColorMode();

  if (isDesktop) {
    return (
      <Box
        borderRightWidth='1px'
        w='18rem'
        position='fixed'
        bottom='0'
        top='0'
        left='0'
        overflowY='auto'
        zIndex='1'
        backgroundColor={colorMode === 'dark' ? 'gray.800' : 'white'}
      >
        <Flex
          as='nav'
          flexDirection='column'
          alignItems='flex-start'
          textDecoration='none'
          pt='4rem'
          pr='5'
          pl='5'
          pb='5'
        >
          <NavList links={config.links} />
        </Flex>
      </Box>
    );
  }
  return null;
};

export default observer(Nav);
