import React from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import type { LinkType } from '../../../interfaces';
import { useHistory } from 'react-router-dom';

type ActiveLinkState = {
  title: string | null;
};

/**
 *
 * NavLink component
 * Returns the link component for navigation.
 */
const NavLink: React.FC<{ link: LinkType; onCloseDrawer?: () => void }> = ({ link, onCloseDrawer }) => {
  const [activeLink, setActiveLink] = React.useState<ActiveLinkState>({ title: null });
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
      onMouseEnter={() => setActiveLink({ title: link.title })}
      onMouseLeave={() => setActiveLink({ title: null })}
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
        color={history.location.pathname === link.location || activeLink.title === link.title ? 'blue.400' : ''}
        backgroundColor={
          activeLink.title === link.title || history.location.pathname === link.location
            ? `${colorMode === 'dark' ? 'gray.700' : 'gray.100'}`
            : ''
        }
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
