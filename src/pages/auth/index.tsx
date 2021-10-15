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
const AuthPage: React.FC<IPageProps> = () => {
  const { authStore } = useRootStore();

  if (authStore.isLoggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <Helmet>
        <title>Auth</title>
      </Helmet>
      <Flex minHeight='100vh' align='center' justifyContent='center' padding='5'>
        <AuthForm />
      </Flex>
    </>
  );
};

export default observer(AuthPage);
