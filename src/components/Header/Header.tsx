import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import AppName from './AppName';
import UserInfo from './User/UserInfo';
import UserNotifications from './User/UserNotifications';
import NavMobile from '../Nav/Mobile/Nav';
import { observer } from 'mobx-react';
import { useRootStore } from 'hooks/useRootStore';

const Header: React.FC = () => {
  const {
    uiStore: { isDesktop },
  } = useRootStore();

  return (
    <Box
      as='header'
      position='fixed'
      top={0}
      left={0}
      right={0}
      borderBottomWidth={1}
      width='100%'
      height='4rem'
      zIndex={4}
    >
      <Flex
        justifyContent='space-between'
        width='100%'
        height='100%'
        alignItems='center'
        paddingLeft='1.5rem'
        paddingRight='1.5rem'
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
