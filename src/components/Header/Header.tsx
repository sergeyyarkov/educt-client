import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import AppName from './AppName';
import UserInfo from './User/UserInfo';
import UserNotifications from './User/UserNotifications';

const Header: React.FC = () => {
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
          <UserNotifications />
          <UserInfo />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
