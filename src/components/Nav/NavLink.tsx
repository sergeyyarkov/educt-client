import React from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import type { LinkType } from 'interfaces';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useRootStore } from 'hooks/useRootStore';

export type NavLinkProps = {
  link: LinkType;
  onCloseDrawer?: () => void;
};

/**
 * Returns the link component for navigation.
 */
const NavLink: React.FC<NavLinkProps> = ({ link, onCloseDrawer }) => {
  const { uiStore } = useRootStore();
  const { colorMode } = useColorMode();
  const history = useHistory();

  const handleClick = () => {
    history.push(link.location);

    /* Close mobile drawer on click link */
    onCloseDrawer && onCloseDrawer();
  };

  return (
    <Box
      as='a'
      onClick={handleClick}
      display='flex'
      margin='3px 0'
      width='100%'
      border='none'
      aria-label={link.title}
      role='link'
      cursor='pointer'
    >
      <Box
        color={uiStore.location === link.location ? 'blue.400' : ''}
        backgroundColor={uiStore.location === link.location ? `${colorMode === 'dark' ? 'gray.700' : 'gray.100'}` : ''}
        alignItems='center'
        borderRadius='9999px'
        display='flex'
        padding='10px 15px'
        fontWeight='500'
        transition='all .1s'
        _hover={{
          bg: `${colorMode === 'dark' ? 'gray.700' : 'gray.100'}`,
          color: `blue.400`,
        }}
      >
        <Box as={link.icon} boxSize='26px' mr={3} />
        {link.title}
      </Box>
    </Box>
  );
};

export default observer(NavLink);
