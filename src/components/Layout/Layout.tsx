import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import { observer } from 'mobx-react';
import { useRootStore } from '../../hooks/useRootStore';
import { useErrorHandler } from 'react-error-boundary';

/**
 *
 * Layout component
 * Сomponent for rendering the current page.
 */
const Layout: React.FC = ({ children }) => {
  const { authStore } = useRootStore();
  const handleError = useErrorHandler();

  React.useEffect(() => {
    if (authStore.isLoggedIn) {
      authStore.root.userStore.loadCurrentUserData().catch(error => {
        if (error.response && error.response.status === 401) {
          handleError(error);
        }
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
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default observer(Layout);
