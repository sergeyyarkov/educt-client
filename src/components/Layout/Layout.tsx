import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import { observer } from 'mobx-react';
import { useRootStore } from '../../hooks/useRootStore';
import { useErrorHandler } from 'react-error-boundary';
import { ColorModeSwitcher } from '../ColorModeSwitcher/ColorModeSwitcher';

/**
 *
 * Layout component
 * Сomponent for rendering the current page.
 */
const Layout: React.FC = ({ children }) => {
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
      <Nav />

      <Flex minH='100vh' flexDirection='column'>
        <Box pl='18rem' mt='4rem' mb='4rem' flex='1 0 auto'>
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
