import React from 'react';
import { Page } from '@educt/components/PageElements';
import { IPageProps } from '@educt/interfaces';
import { Chat } from '@educt/components/Chat';
import { observer } from 'mobx-react';
import { useRootStore } from '@educt/hooks/useRootStore';
import LoadingPage from '@educt/components/LoadingPage';

/**
 * Messages page
 */
const MessagesPage: React.FC<IPageProps> = () => {
  const {
    userStore: { me },
  } = useRootStore();

  if (me === null) return <LoadingPage />;

  return (
    <Page maxW='100%' mt='0' mb='0'>
      <Page.Content>
        <Chat>
          <Chat.Sidebar>
            <Chat.Sidebar.Heading />
            <Chat.Sidebar.Users />
          </Chat.Sidebar>
          <Chat.Window />
        </Chat>
      </Page.Content>
    </Page>
  );
};

export default observer(MessagesPage);
