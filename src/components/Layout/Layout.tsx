import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Header from 'components/Header/Header';
import NavDesktop from 'components/Nav/Desktop/Nav';
import { observer } from 'mobx-react';
import { useRootStore } from 'hooks/useRootStore';
import { useErrorHandler } from 'react-error-boundary';
import { ColorModeSwitcher } from 'components/ColorModeSwitcher/ColorModeSwitcher';
import LoadingPage from 'components/Loading/LoadingPage';

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
      <NavDesktop />
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
            {userStore.me === null ? <LoadingPage /> : children}
            <ColorModeSwitcher position='absolute' right={0} bottom={0} margin={5} />
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default observer(Layout);
