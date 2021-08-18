import { observer } from 'mobx-react';
import React from 'react';
import Helmet from 'react-helmet';
import { useHistory } from 'react-router-dom';
import Auth from '../components/Auth/Auth';
import { useRootStore } from '../hooks/useRootStore';
import { IPageProps } from '../interfaces';

/**
 * Auth page
 */
const AuthPage: React.FC<IPageProps> = () => {
  const { authStore } = useRootStore();
  const history = useHistory();

  if (authStore.isLoggedIn) {
    history.push('/');
  }

  return (
    <>
      <Helmet>
        <title>Auth</title>
      </Helmet>
      <Auth />
    </>
  );
};

export default observer(AuthPage);
