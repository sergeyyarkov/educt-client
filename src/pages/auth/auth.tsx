import React from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { IPageProps } from '@educt/interfaces';
import { Flex } from '@chakra-ui/react';
import { useRootStore } from '@educt/hooks/useRootStore';

import AuthForm from './components/AuthForm';

/**
 * Auth page
 */
const AuthPage: React.FC<IPageProps> = ({ title }) => {
  const { authStore } = useRootStore();

  /**
   * User already authorized
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
