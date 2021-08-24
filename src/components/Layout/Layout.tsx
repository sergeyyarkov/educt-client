import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Header from '../Header/Header';
import NavDesktop from '../Nav/Desktop/Nav';
import { observer } from 'mobx-react';
import { useRootStore } from '../../hooks/useRootStore';
import { useErrorHandler } from 'react-error-boundary';
import { ColorModeSwitcher } from '../ColorModeSwitcher/ColorModeSwitcher';
import useWindowDimensions from '../../hooks/useWindowDimensions';

/**
 *
 * Layout component
 * Сomponent for rendering the current page.
 */
const Layout: React.FC = ({ children }) => {
  const { isDesktop } = useWindowDimensions();
  const { authStore, userStore } = useRootStore();
  const handleError = useErrorHandler();

  React.useEffect(() => {
    if (authStore.isLoggedIn) {
      userStore.loadCurrentUserData().catch(error => {
        handleError(error);
      });
    }
  });

  return (
    <>
      <Header />
      {isDesktop && <NavDesktop />}
      <Flex minH='100vh' flexDirection='column'>
        <Box
          pl='80'
          mt='20'
          mb='10'
          flex='1 0 auto'
          sx={{
            '@media (max-width: 768px)': {
              paddingLeft: 0,
            },
          }}
        >
          <Box as='main' mr='auto' ml='auto' maxW='85rem' pl={5} pr={5} pt='2rem' pb='2rem'>
            {children}
            <ColorModeSwitcher position='absolute' right={0} bottom={0} margin={5} />
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default observer(Layout);
