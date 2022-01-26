import React, { Suspense, useContext } from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { useErrorHandler } from 'react-error-boundary';
import { userContainRoles } from '@educt/helpers';
import { Flex, Box } from '@chakra-ui/react';

/**
 * Types
 */
import { UserRoleEnum } from '@educt/enums';

/**
 * Components
 */
import LoadingPage from '@educt/components/LoadingPage';
import Header from '@educt/components/Header';
import NavDesktop from '@educt/components/Nav/Desktop';

/**
 * Hooks
 */
import { useEffect } from 'react';
import { useRootStore } from '@educt/hooks/useRootStore';

/**
 * Contexts
 */
import { SocketContext } from '@educt/contexts';

type LayoutPropsType = { roles: UserRoleEnum[] | undefined };

/**
 * Render the current page using layout
 */
const Layout: React.FC<LayoutPropsType> = ({ children, roles }) => {
  const { userStore } = useRootStore();
  const { socket } = useContext(SocketContext);
  const handleError = useErrorHandler();

  /**
   * Fetch authorized user handler
   */
  useEffect(() => {
    userStore.loadCurrentUserData().catch(error => handleError(error));
  }, [handleError, userStore]);

  /**
   * Connect to websocket server
   */
  useEffect(() => {
    if (!socket?.connected) {
      socket?.connect();
    }
  }, [socket]);

  return (
    <>
      <Header />
      <NavDesktop />
      <Flex minH='100vh' justifyContent='center'>
        <Box as='main' flex='1 0' maxW='85rem' ml={{ base: '0', lg: '20rem' }} mt='7rem' mb='1rem' pr='2rem' pl='2rem'>
          <Suspense fallback={<LoadingPage />}>
            {(() => {
              /**
               * Check user roles if defined "roles" prop in
               * PrivateRoute component and return page
               */
              if (roles) {
                const { me } = userStore;
                if (me === null) return <LoadingPage />;

                /**
                 * The user does not have the required roles
                 */
                if (!userContainRoles(me.roles, roles)) return <Redirect to='/404' />;

                return children;
              } else {
                /**
                 * Return children if "roles" prop is not defined
                 */
                return children;
              }
            })()}
          </Suspense>
        </Box>
      </Flex>
    </>
  );
};

export default observer(Layout);
