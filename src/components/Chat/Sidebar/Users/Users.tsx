import React from 'react';
import { observer } from 'mobx-react';
import { Box, Stack, StackProps, Text } from '@chakra-ui/react';
import { User } from './User';
import { useChatContext } from '../../context';
import { useRootStore } from '@educt/hooks/useRootStore';
import { Skeleton } from '@chakra-ui/react';
import { useFetchUsers } from '@educt/hooks/queries';

const Wrapper: React.FC<StackProps> = ({ children }) => {
  return (
    <Stack mt='12' maxH='690px' overflowY={'scroll'} pr={{ base: '0', lg: '3' }}>
      {children}
    </Stack>
  );
};

const Users: React.FC = observer(() => {
  const { data: users } = useFetchUsers();
  const {
    userStore: { me },
    onlineStore,
  } = useRootStore();
  const { search } = useChatContext();

  if (users === null || me === null)
    return (
      <Wrapper>
        <Skeleton h='90px' borderRadius={'lg'} />
        <Skeleton h='90px' borderRadius={'lg'} />
      </Wrapper>
    );

  const filtered = (!search ? users : users.filter(u => u.fullname.toLocaleLowerCase().includes(search)))
    .concat()
    .sort(u => (onlineStore.isOnline(u.id) ? -1 : 1));

  const isEmpty = filtered.length === 0;

  return (
    <Wrapper>
      {/* Favorites */}
      <User id={me.id}>
        <User.Avatar isOnline fullname={me.fullname} />
        <User.Info fullname={me.fullname} lastMessage={''} />
      </User>

      {/* User list */}
      {!isEmpty ? (
        filtered.map(
          user =>
            user.id !== me.id && (
              <User key={user.id} id={user.id}>
                <User.Avatar isOnline={onlineStore.isOnline(user.id) || false} fullname={user.fullname} />
                <User.Info fullname={user.fullname} lastMessage={''} />
              </User>
            )
        )
      ) : (
        <Box textAlign={'center'}>
          <Text userSelect={'none'} color='gray.500'>
            Cannot find any users
          </Text>
        </Box>
      )}
    </Wrapper>
  );
});
export { Users };
