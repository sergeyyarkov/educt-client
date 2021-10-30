import React from 'react';
import { observer } from 'mobx-react';
import { Flex, Box, Heading, useColorMode } from '@chakra-ui/react';
import { MdSchool } from 'react-icons/md';
import config from '@educt/config';

/**
 * Components
 */
import NavMobile from '@educt/components/Nav/Mobile';
import ColorModeSwitcher from '@educt/components/ColorModeSwitcher';
import UserInfo from './UserInfo';
import UserNotifications from './UserNotifications';

/**
 * Hooks
 */
import { useMediaQuery } from '@chakra-ui/media-query';

const Header: React.FC = () => {
  const [isDesktop] = useMediaQuery('(min-width: 992px)');
  const { colorMode } = useColorMode();

  return (
    <Box
      as='header'
      position='fixed'
      top={0}
      left={0}
      right={0}
      // borderBottomWidth={1}
      // h='43px'
      boxShadow='md'
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
        <Flex alignItems='center'>
          <Box mr='4'>
            <Box as={MdSchool} color='blue.500' size='36px' />
          </Box>
          <Box>
            <Heading as='p' fontSize='2xl' lineHeight='1'>
              {config.metaData.appName}
            </Heading>
          </Box>
        </Flex>
        {isDesktop ? (
          <Flex>
            <ColorModeSwitcher />
            <UserNotifications />
            <UserInfo />
          </Flex>
        ) : (
          <NavMobile />
        )}
      </Flex>
    </Box>
  );
};

export default observer(Header);
