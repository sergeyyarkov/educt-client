import React from 'react';
import { observer } from 'mobx-react';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

/**
 * Components
 */
import UpdatePasswordForm from './components/UpdatePasswordForm';
import LoadingPage from '@educt/components/LoadingPage';

/**
 * Hooks
 */
import { useRootStore } from '@educt/hooks/useRootStore';
import { Page } from '@educt/components/PageElements';

/**
 *  Change password page
 */
const ChangePasswordPage: React.FC<IPageProps> = () => {
  const {
    userStore: { me },
  } = useRootStore();

  if (me === null) return <LoadingPage />;

  return (
    <Page>
      <Page.Heading heading='Update password' description='Your new password must be different from the current one.' />
      <Page.Content>
        <UpdatePasswordForm />
      </Page.Content>
    </Page>
  );
};

export default observer(ChangePasswordPage);
