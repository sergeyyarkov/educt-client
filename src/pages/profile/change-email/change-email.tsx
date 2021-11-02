import React from 'react';
import { observer } from 'mobx-react';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

/**
 * Components
 */
import LoadingPage from '@educt/components/LoadingPage';
import UpdateEmailForm from './components/UpdateEmailForm';

/**
 * Containers
 */
import ConfirmEmailContainer from './containers/ConfirmEmailContainer';

/**
 * Hooks
 */
import { useRootStore } from '@educt/hooks/useRootStore';

/**
 * Contexts
 */
import { ChangeEmailPageContext } from '@educt/contexts';

/**
 * Providers
 */
import { ChangeEmailPageContextProvider } from '@educt/providers';
import PrevPageButton from '@educt/components/PrevPageButton';

/**
 * Change email page
 */
const ChangeEmailPage: React.FC<IPageProps> = () => {
  const {
    userStore: { me },
  } = useRootStore();

  if (me === null) return <LoadingPage />;

  return (
    <ChangeEmailPageContextProvider>
      <ChangeEmailPageContext.Consumer>
        {({ isCodeSent, confirmEmailData }) => (
          <>
            {!isCodeSent ? (
              <Box maxW='700px'>
                <Flex alignItems='center'>
                  <PrevPageButton prevPage='/profile' />
                  <Heading as='h1'>Edit email address</Heading>
                </Flex>
                <Box mt='3'>
                  <Text>Type your new email address.</Text>
                </Box>
                <UpdateEmailForm currentEmail={me.email} />
              </Box>
            ) : (
              confirmEmailData && <ConfirmEmailContainer data={confirmEmailData} />
            )}
          </>
        )}
      </ChangeEmailPageContext.Consumer>
    </ChangeEmailPageContextProvider>
  );
};

export default observer(ChangeEmailPage);
