import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/button';
import { ChevronLeftIcon } from '@chakra-ui/icons';

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
 * Hooks
 */
import { useHistory } from 'react-router';
import { useRootStore } from '@educt/hooks/useRootStore';
import { observer } from 'mobx-react';

/**
 * Providers
 */
import { ChangeEmailPageContextProvider } from '@educt/providers';
import { ChangeEmailPageContext } from '@educt/contexts';
import ConfirmEmailContainer from './containers/ConfirmEmailContainer';

{
  /* <>
              {!isCodeSent ? (
                <UpdateEmailForm currentEmail={me.email} />
              ) : (
                confirmEmailData && <ConfirmEmailContainer data={confirmEmailData} />
              )}
            </> */
}

/**
 * Change email page
 */
const ChangeEmailPage: React.FC<IPageProps> = () => {
  const {
    userStore: { me },
  } = useRootStore();
  const history = useHistory();

  if (me === null) return <LoadingPage />;

  return (
    <ChangeEmailPageContextProvider>
      <ChangeEmailPageContext.Consumer>
        {({ isCodeSent, confirmEmailData }) => (
          <>
            {!isCodeSent ? (
              <Box maxW='700px'>
                <Flex alignItems='center'>
                  <IconButton
                    aria-label='Back'
                    borderRadius='full'
                    icon={<ChevronLeftIcon />}
                    onClick={() => history.push('/profile')}
                    mr='5'
                  />
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
