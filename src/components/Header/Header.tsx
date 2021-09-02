import React from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from 'hooks/useRootStore';
import { Flex, Box, useColorMode } from '@chakra-ui/react';
import AppName from './AppName';
import UserInfo from './UserInfo';
import UserNotifications from './UserNotifications';
import NavMobile from 'components/Nav/Mobile';

const Header: React.FC = () => {
  const {
    uiStore: { isDesktop },
  } = useRootStore();
  const { colorMode } = useColorMode();

  return (
    <Box
      as='header'
      position='fixed'
      top={0}
      left={0}
      right={0}
      borderBottomWidth={1}
      backgroundColor={colorMode === 'dark' ? 'gray.800' : 'white'}
      zIndex={4}
    >
      <Flex
        justifyContent='space-between'
        width='100%'
        height='100%'
        alignItems='center'
        padding='5px 1.5rem 5px 1.5rem'
      >
        <AppName />
        <Flex>
          {isDesktop ? (
            <>
              <UserNotifications />
              <UserInfo />
            </>
          ) : (
            <NavMobile />
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default observer(Header);
