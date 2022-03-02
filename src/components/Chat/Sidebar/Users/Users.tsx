import React from 'react';
import { observer } from 'mobx-react';
import { Stack, StackProps } from '@chakra-ui/react';
import { User } from './User';
import { useChatContext } from '../../context';
import { useRootStore } from '@educt/hooks/useRootStore';
import { Skeleton } from '@chakra-ui/react';
import { useFetchConversations } from '@educt/hooks/queries';

const Wrapper: React.FC<StackProps> = ({ children }) => {
  return (
    <Stack mt='12' maxH='690px' overflowY={'scroll'} pr={{ base: '0', lg: '3' }}>
      {children}
    </Stack>
  );
};

const Users: React.FC = observer(() => {
  const {
    userStore: { me },
    onlineStore,
  } = useRootStore();
  const { data: conversations } = useFetchConversations();
  const { search } = useChatContext();

  if (conversations === null || me === null)
    return (
      <Wrapper>
        <Skeleton h='90px' borderRadius={'lg'} />
        <Skeleton h='90px' borderRadius={'lg'} />
      </Wrapper>
    );

  const filtered = (
    !search ? conversations : conversations.filter(u => u.fullname.toLocaleLowerCase().includes(search))
  )
    .concat()
    .sort((c1, c2) => new Date(c2.lastMessage.time).valueOf() - new Date(c1.lastMessage.time).valueOf());

  const isEmpty = filtered.length === 0;

  return (
    <Wrapper>
      {/* Favorites */}
      <User id={me.id}>
        <User.Avatar isOnline fullname={me.fullname} />
        <User.Info fullname={me.fullname} />
      </User>

      {/* User list */}
      {!isEmpty &&
        filtered.map(
          c =>
            c.userId !== me.id && (
              <User key={c.userId} id={c.userId}>
                <User.Avatar isOnline={onlineStore.isOnline(c.userId) || false} fullname={c.fullname} />
                <User.Info fullname={c.fullname} lastMessage={c.lastMessage} />
                <User.Time
                  time={new Date(c.lastMessage.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                />
              </User>
            )
        )}
    </Wrapper>
  );
});
export { Users };
