import React from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import LoadingPage from '@educt/components/LoadingPage';
import { Page } from '@educt/components/PageElements';
import { UserProfile } from '@educt/components/UserProfile';
import type { IPageProps } from '@educt/interfaces';

/**
 * Hooks
 */
import { useParams } from 'react-router-dom';
import { useFetchUser } from '@educt/hooks/queries/user/useFetchUser';
import { useRootStore } from '@educt/hooks/useRootStore';

const UserPage: React.FC<IPageProps> = () => {
  const params = useParams<{ id: string }>();
  const {
    userStore: { me },
    onlineStore,
  } = useRootStore();
  const { data: user, error, isLoading } = useFetchUser(params.id);

  if (error?.response?.status === 404) return <Redirect to='/404' />;

  if (user === null || me === null || isLoading) return <LoadingPage />;

  /**
   * Redirect to profile page
   */
  if (me.id === params.id) return <Redirect to='/profile' />;

  return (
    <Page>
      <Page.Content maxW={'900px'}>
        <UserProfile>
          <UserProfile.Base>
            <UserProfile.Avatar name={user.fullname} isOnline={onlineStore.isOnline(user.id)}>
              <UserProfile.ChatButton userid={user.id} />
            </UserProfile.Avatar>
            <UserProfile.Info>
              <UserProfile.Heading fullname={user.fullname} roles={user.roles} />
              <UserProfile.Details registered={user.created_at} lastLogin={user.last_login} />
              <UserProfile.About about={user.about} />
            </UserProfile.Info>
          </UserProfile.Base>
        </UserProfile>
      </Page.Content>
    </Page>
  );
};

export default observer(UserPage);
