import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { useErrorHandler } from 'react-error-boundary';
import { userContainRoles } from 'helpers';
import { Flex, Box } from '@chakra-ui/react';

/**
 * Types
 */
import { UserRoleEnum } from 'enums';

/**
 * Components
 */
import LoadingPage from 'components/LoadingPage';
import Header from 'components/Header';
import NavDesktop from 'components/Nav/Desktop';

/**
 * Hooks
 */
import { useRootStore } from 'hooks/useRootStore';

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
            '@media (max-width: 1280px)': {
              ml: '20rem',
            },
            '@media (max-width: 991px)': {
              ml: '0',
            },
          }}
        >
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
        </Box>
      </Flex>
    </>
  );
};

export default observer(Layout);
