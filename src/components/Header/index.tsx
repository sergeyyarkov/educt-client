import React from 'react';
import { Flex, Box, BoxProps } from '@chakra-ui/react';
import { Logo } from './Logo';
import { Profile } from './Profile';
import { Notifications } from './Notifications';
import ColorModeSwitcher from '@educt/components/ColorModeSwitcher';
import NavMobile from '@educt/components/Nav/Mobile';
import type { ColorModeSwitcherProps } from '../ColorModeSwitcher/ColorModeSwitcher';

/**
 * Hooks
 */
import { useColorModeValue, useMediaQuery } from '@chakra-ui/react';

interface IHeaderComposition {
  Logo: React.FC<BoxProps>;
  ThemeSwitcher: React.FC<ColorModeSwitcherProps>;
  Notifications: React.FC;
  Profile: React.FC;
}

const Header: React.FC<BoxProps> & IHeaderComposition = ({ children }) => {
  const [isDesktop] = useMediaQuery('(min-width: 992px)');

  return (
    <Box
      as={'header'}
      position={'fixed'}
      top={0}
      left={0}
      right={0}
      borderBottomWidth={'1px'}
      backgroundColor={useColorModeValue('white', 'gray.800')}
      zIndex={4}
    >
      <Flex justifyContent={'space-between'} w={'full'} height={'full'} alignItems={'center'} py={'2'} px={'6'}>
        {isDesktop ? children : <NavMobile />}
      </Flex>
    </Box>
  );
};

Header.Logo = Logo;
Header.ThemeSwitcher = props => <ColorModeSwitcher {...props} />;
Header.Notifications = Notifications;
Header.Profile = Profile;

export default Header;
