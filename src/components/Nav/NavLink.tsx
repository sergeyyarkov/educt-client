import React from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import type { History } from 'history';
import type { LinkType } from '../../interfaces';
import type { ActiveLinkState } from './Nav';

/**
 *
 * NavLink component
 * Returns the link component for navigation.
 *
 */

interface NavLinkProps {
  handleOnHoverLink: (title: string) => void;
  handleOnLeaveLink: () => void;
  handleRoute: (location: string) => void;
  history: History;
  activeLink: ActiveLinkState;
  link: LinkType;
}

const NavLink: React.FC<NavLinkProps> = ({
  handleOnHoverLink,
  handleOnLeaveLink,
  handleRoute,
  history,
  activeLink,
  link,
}) => {
  const { colorMode } = useColorMode();
  const onMouseEnter = () => handleOnHoverLink(link.title);
  const onClick = () => handleRoute(link.location);

  return (
    <Box
      as='a'
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleOnLeaveLink}
      onClick={onClick}
      display='flex'
      margin='3px 0'
      width='100%'
      border='none'
      aria-label={link.title}
      role='link'
      cursor='pointer'
    >
      <Box
        color={history.location.pathname === link.location || activeLink.title === link.title ? 'blue.400' : ''}
        backgroundColor={activeLink.title === link.title ? `${colorMode === 'dark' ? 'gray.700' : 'gray.100'}` : ''}
        alignItems='center'
        borderRadius='9999px'
        display='flex'
        padding='10px 15px'
        fontWeight='500'
        transition='all .1s'
      >
        <Box as={link.icon} boxSize='26px' mr={3} />
        {link.title}
      </Box>
    </Box>
  );
};

export default NavLink;
