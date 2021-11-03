import React from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

/**
 * Components
 */
import AuthForm from './components/AuthForm';

/**
 * Hooks
 */
import { useRootStore } from '@educt/hooks/useRootStore';

/**
 * Auth page
 */
const AuthPage: React.FC<IPageProps> = ({ title }) => {
  const { authStore } = useRootStore();

  /**
   * User already authorized
   * This is triggered by mobx observer function
   */
  if (authStore.isLoggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Flex minHeight='100vh' align='center' justifyContent='center' padding='5'>
        <AuthForm />
      </Flex>
    </>
  );
};

export default observer(AuthPage);
