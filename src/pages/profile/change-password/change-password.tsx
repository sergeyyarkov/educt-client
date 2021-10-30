import React from 'react';
import { Box, Heading, Flex, Text, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

/**
 * Components
 */
import UpdatePasswordForm from './components/UpdatePasswordForm';

/**
 * Hooks
 */
import { useRootStore } from '@educt/hooks/useRootStore';
import { useHistory } from 'react-router';
import LoadingPage from '@educt/components/LoadingPage';
import { observer } from 'mobx-react';

/**
 *  Change password page
 */
const ChangePasswordPage: React.FC<IPageProps> = () => {
  const {
    userStore: { me },
  } = useRootStore();
  const history = useHistory();

  if (me === null) return <LoadingPage />;

  return (
    <Box maxW='700px'>
      <Flex alignItems='center'>
        <IconButton
          aria-label='Profile page'
          borderRadius='full'
          icon={<ChevronLeftIcon />}
          onClick={() => history.push('/profile')}
          mr='5'
        />
        <Heading as='h1'>Update password</Heading>
      </Flex>
      <Box mt='3'>
        <Text>Your new password must be different from the current one.</Text>
      </Box>
      <UpdatePasswordForm />
    </Box>
  );
};

export default observer(ChangePasswordPage);
