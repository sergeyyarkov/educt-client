import React from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { IPageProps } from 'interfaces';
import { Flex, Box } from '@chakra-ui/react';
import { useRootStore } from 'hooks/useRootStore';
import { MdSchool } from 'react-icons/md';

import AuthForm from 'components/Auth/AuthForm';

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
        <Box p={8} width='full' maxWidth='450px' borderWidth={1} borderRadius={8}>
          <Box textAlign='center'>
            <Flex justifyContent='center'>
              <Box as={MdSchool} color='blue.500' size='64px' />
            </Flex>
          </Box>
          <Box>
            <AuthForm />
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default observer(AuthPage);
