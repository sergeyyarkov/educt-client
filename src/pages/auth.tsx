import { observer } from 'mobx-react';
import Helmet from 'react-helmet';
import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { MdSchool } from 'react-icons/md';
import { IPageProps } from 'interfaces';

import AuthForm from 'components/Auth/AuthForm';
import { useRootStore } from 'hooks/useRootStore';
import { Redirect } from 'react-router-dom';

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
