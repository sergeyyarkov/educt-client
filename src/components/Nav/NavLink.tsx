import React from 'react';
import { observer } from 'mobx-react';
import { userContainRoles } from '@educt/helpers';
import { Box, useColorMode } from '@chakra-ui/react';
import type { LinkType } from '@educt/types';

/**
 * Hooks
 */
import { useRootStore } from '@educt/hooks/useRootStore';

type NavLinkPropsType = {
  link: LinkType;
  onClickLink: (link: LinkType) => void;
};

/**
 * Returns the link component for navigation.
 */
const NavLink: React.FC<NavLinkPropsType> = ({ link, onClickLink }) => {
  const { uiStore, userStore } = useRootStore();
  const { colorMode } = useColorMode();
  const onClick = () => onClickLink(link);

  if (!link.public && link.roles !== undefined) {
    const { me } = userStore;
    if (me === null) return null;
    if (!userContainRoles(me.roles, link.roles)) return null;
  }

  return (
    <Box
      as='a'
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
        color={uiStore.location === link.location ? 'blue.400' : ''}
        backgroundColor={uiStore.location === link.location ? `${colorMode === 'dark' ? 'gray.700' : 'gray.100'}` : ''}
        alignItems='center'
        borderRadius='3xl'
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
