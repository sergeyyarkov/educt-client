import React from 'react';

/**
 * Types
 */
import type { IPageProps } from '@educt/interfaces';

/**
 * Components
 */
import { PageContent, PageHeading, PageWrapper } from '@educt/components/PageElements';
import { UserList, UserItem } from './components/UserList';
import LoadingPage from '@educt/components/LoadingPage';

/**
 * Hooks
 */
import { useRootStore } from '@educt/hooks/useRootStore';

/**
 * Context Providers
 */
import { UsersPageContextProvider } from '@educt/providers';

/**
 * Users Page
 */
const UsersPage: React.FC<IPageProps> = () => {
  const {
    userStore: { me },
  } = useRootStore();

  if (me === null) return <LoadingPage />;

  return (
    // TODO: delete page context for better performance
    <UsersPageContextProvider>
      <PageWrapper>
        <PageHeading heading='User management' description='You can add or delete users on this page.' />
        <PageContent mt='5'>
          <UserList render={UserItem} limit={6} />
        </PageContent>
      </PageWrapper>
    </UsersPageContextProvider>
  );
};

export default UsersPage;
