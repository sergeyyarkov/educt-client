import React from 'react';
import { Redirect } from 'react-router-dom';
import LoadingPage from '@educt/components/LoadingPage';
import { PageContent, PageWrapper } from '@educt/components/PageElements';
import { UserProfile } from '@educt/components/UserProfile';
import type { IPageProps } from '@educt/interfaces';

/**
 * Hooks
 */
import { useParams } from 'react-router-dom';
import { useFetchUser } from '@educt/hooks/queries/user/useFetchUser';

const UserPage: React.FC<IPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, error, isLoading } = useFetchUser(id);

  if (error?.response?.status === 404) return <Redirect to='/404' />;

  if (user === null || isLoading) return <LoadingPage />;

  return (
    <PageWrapper maxW='800px'>
      <PageContent>
        <UserProfile>
          <UserProfile.Avatar name={user.fullname} isOnline>
            <UserProfile.ChatButton userid={user.id} />
          </UserProfile.Avatar>
          <UserProfile.Info>
            <UserProfile.Heading fullname={user.fullname} roles={user.roles} />
            <UserProfile.Details registered={user.created_at} lastLogin={user.last_login} />
            <UserProfile.About about={user.about} />
          </UserProfile.Info>
        </UserProfile>
      </PageContent>
    </PageWrapper>
  );
};

export default UserPage;
