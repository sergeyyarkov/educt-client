import { observer } from 'mobx-react';
import Helmet from 'react-helmet';
import React, { useEffect } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { MdSchool } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { useRootStore } from '../hooks/useRootStore';
import { IPageProps } from '../interfaces';

import AuthForm from '../components/Auth/AuthForm';

/**
 * Auth page
 */
const AuthPage: React.FC<IPageProps> = () => {
  const { authStore } = useRootStore();
  const history = useHistory();

  useEffect(() => {
    if (authStore.isLoggedIn) {
      history.push('/');
    }
  });

  return (
    <>
      <Helmet>
        <title>Auth</title>
      </Helmet>
      <Flex
        minHeight='100vh'
        align='center'
        justifyContent='center'
        padding='5'>
        <Box
          p={8}
          width='full'
          maxWidth='450px'
          borderWidth={1}
          borderRadius={8}>
          <Box textAlign='center'>
            <Flex justifyContent='center'>
              <MdSchool fill='blue' size='64px' />
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
