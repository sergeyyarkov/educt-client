import React from 'react';
import { observer } from 'mobx-react';
import * as helpers from '@educt/helpers';
import { Flex, Box, Icon, Text } from '@chakra-ui/react';

/**
 * Types
 */
import type { LinkType } from '@educt/types';

/**
 * Hooks
 */
import { useRootStore } from '@educt/hooks/useRootStore';
import { useColorMode } from '@chakra-ui/react';

type NavLinkPropsType = {
  link: LinkType;
  onClickLink: (link: LinkType) => void;
};

const NavLink: React.FC<NavLinkPropsType> = ({ link, onClickLink }) => {
  const { uiStore, userStore } = useRootStore();
  const { colorMode } = useColorMode();
  const isActive = uiStore.location === link.location;
  const onClick = () => onClickLink(link);

  if (!link.public && link.roles !== undefined) {
    const { me } = userStore;
    if (me === null) return null;
    if (!helpers.userContainRoles(me.roles, link.roles)) return null;
  }

  return (
    <Box
      as='a'
      onClick={onClick}
      display='block'
      aria-label={link.title}
      fontWeight='medium'
      borderRadius='md'
      mt='0.5rem'
      pt='2'
      pb='2'
      paddingInlineStart='3'
      paddingInlineEnd='3'
      transition='all 0.3s ease 0s'
      lineHeight='1.5rem'
      textDecoration='none'
      cursor='pointer'
      outline='transparent solid 2px'
      outlineOffset='2px'
      color={isActive ? 'white' : ''}
      backgroundColor={isActive ? `${colorMode === 'dark' ? 'gray.700' : 'blue.500'}` : ''}
      _hover={{
        bg: `${colorMode === 'dark' ? 'gray.700' : `${!isActive ? 'gray.100' : ''}`}`,
      }}
    >
      <Flex flexDir='row' alignItems='center'>
        <Icon as={link.icon} boxSize='21px' />
        <Text as='span' ml='16px'>
          {link.title}
        </Text>
      </Flex>
    </Box>
  );
};

export default observer(NavLink);
