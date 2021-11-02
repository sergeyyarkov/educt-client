import React from 'react';
import { observer } from 'mobx-react';
import { Box, Heading, Flex, Text } from '@chakra-ui/react';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

/**
 * Components
 */
import UpdatePasswordForm from './components/UpdatePasswordForm';
import PrevPageButton from '@educt/components/PrevPageButton';
import LoadingPage from '@educt/components/LoadingPage';

/**
 * Hooks
 */
import { useRootStore } from '@educt/hooks/useRootStore';

/**
 *  Change password page
 */
const ChangePasswordPage: React.FC<IPageProps> = () => {
  const {
    userStore: { me },
  } = useRootStore();

  if (me === null) return <LoadingPage />;

  return (
    <Box maxW='700px'>
      <Flex alignItems='center'>
        <PrevPageButton prevPage='/profile' />
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
