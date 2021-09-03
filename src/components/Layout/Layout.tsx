import React from 'react';
import { observer } from 'mobx-react';
import { useErrorHandler } from 'react-error-boundary';
import { Flex, Box } from '@chakra-ui/react';
import { useRootStore } from 'hooks/useRootStore';
import Header from 'components/Header';
import NavDesktop from 'components/Nav/Desktop';

/**
 *
 * Layout component
 * Сomponent for rendering the current page.
 */
const Layout: React.FC = ({ children }) => {
  const { userStore } = useRootStore();
  const handleError = useErrorHandler();

  React.useEffect(() => {
    userStore.loadCurrentUserData().catch(error => handleError(error));
  }, [handleError, userStore]);

  return (
    <>
      <Header />
      <Flex minH='100vh'>
        <NavDesktop />
        <Box
          as='main'
          flex='1 0'
          maxW='85rem'
          ml='25rem'
          mt='7rem'
          mb='1rem'
          pr='2rem'
          pl='2rem'
          sx={{
            '@media (max-width: 1280px)': {
              ml: '20rem',
            },
            '@media (max-width: 991px)': {
              ml: '0',
            },
          }}
        >
          {children}
        </Box>
      </Flex>
    </>
  );
};

export default observer(Layout);
