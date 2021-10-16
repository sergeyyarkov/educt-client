import React, { Suspense, useEffect } from 'react';
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
import { useRootStore } from '@educt/hooks/useRootStore';

type LayoutPropsType = { roles: UserRoleEnum[] | undefined };

/**
 * Render the current page using layout
 */
const Layout: React.FC<LayoutPropsType> = ({ children, roles }) => {
  const { userStore } = useRootStore();
  const handleError = useErrorHandler();

  useEffect(() => {
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
            '@media (max-width: 1400px)': {
              ml: '20rem',
            },
            '@media (max-width: 991px)': {
              ml: '0',
            },
          }}
        >
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
