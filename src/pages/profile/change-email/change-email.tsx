import React from 'react';
import { observer } from 'mobx-react';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

/**
 * Components
 */
import { Page } from '@educt/components/PageElements';
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
          <Page>
            {!isCodeSent ? (
              <>
                <Page.Heading heading='Edit email address' description='Type your new email address.' />
                <Page.Content maxW='650px'>
                  <UpdateEmailForm currentEmail={me.email} />
                </Page.Content>
              </>
            ) : (
              confirmEmailData && <ConfirmEmailContainer data={confirmEmailData} />
            )}
          </Page>
        )}
      </ChangeEmailPageContext.Consumer>
    </ChangeEmailPageContextProvider>
  );
};

export default observer(ChangeEmailPage);
