import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

/**
 * Types
 */
import { IPageProps } from 'interfaces';

/**
 *  Components
 */
import LoadingPage from './components/LoadingPage';

/**
 *  Containers
 */
import UpdatePasswordContainer from './containers/UpdatePasswordContainer';
import UpdateEmailContainer from './containers/UpdateEmailContainer';
import ConfirmEmailContainer from './containers/ConfirmEmailContainer';

/**
 * Hooks
 */
import { useRootStore } from 'hooks/useRootStore';
import { useHistory } from 'react-router-dom';

/**
 * Contexts
 */
import { ProfilePageContext } from 'contexts';

/**
 * Providers
 */
import { ProfilePageContextProvider } from 'providers';
import MainContainer from './containers/MainContainer';

/**
 * Profile page
 */
const ProfilePage: React.FC<IPageProps> = () => {
  const {
    userStore: { me },
    authStore,
  } = useRootStore();
  const history = useHistory();

  useEffect(() => {
    if (!authStore.isLoggedIn) {
      history.push('/auth');
    }
  });

  if (me === null) {
    return <LoadingPage />;
  }

  return (
    <ProfilePageContextProvider>
      <ProfilePageContext.Consumer>
        {({ statusPageView, pageData }) => {
          switch (statusPageView) {
            case 'default':
              return <MainContainer />;
            case 'update-password':
              return <UpdatePasswordContainer />;
            case 'update-email':
              return <UpdateEmailContainer />;
            case 'confirm-email':
              return pageData.confirmEmailData && <ConfirmEmailContainer data={pageData.confirmEmailData} />;
            default:
              return null;
          }
        }}
      </ProfilePageContext.Consumer>
    </ProfilePageContextProvider>
  );
};

export default observer(ProfilePage);
