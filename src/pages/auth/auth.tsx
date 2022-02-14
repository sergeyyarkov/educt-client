import React from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Box } from '@chakra-ui/react';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

/**
 * Components
 */
import Logo from '@educt/components/Logo';
import AuthForm from './components/AuthForm';
import { Card } from '@educt/components/Card';

/**
 * Hooks
 */
import { useRootStore } from '@educt/hooks/useRootStore';
import { useColorModeValue } from '@chakra-ui/react';

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
    <Box bg={useColorModeValue('gray.50', 'inherit')} minH='100vh' py='12' px={{ base: '4', lg: '8' }}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Box maxW='md' mx='auto' mt='20'>
        <Logo mx='auto' h='14' mb={{ base: '10', md: '10' }} />
        <Card p='6'>
          <AuthForm />
        </Card>
      </Box>
    </Box>
  );
};

export default observer(AuthPage);
