import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import NavList from '../NavList';
import { useRootStore } from 'hooks/useRootStore';
import { observer } from 'mobx-react';
import config from 'config';

/**
 *
 * Nav component
 * Component for navigating the application.
 */
const Nav: React.FC = () => {
  const {
    uiStore: { isDesktop },
  } = useRootStore();

  if (isDesktop) {
    return (
      <Box display='block' position='fixed' left={0} right={0} top={0} width='100%' height='100%' maxW='18rem'>
        <Box top='4rem' position='relative' overflowY='auto' borderRightWidth={1}>
          <Flex
            as='nav'
            flexDirection='column'
            alignItems='flex-start'
            textDecoration='none'
            height='calc(100vh - 4rem)'
            padding='5'
          >
            <NavList links={config.links} />
          </Flex>
        </Box>
      </Box>
    );
  }
  return null;
};

export default observer(Nav);
