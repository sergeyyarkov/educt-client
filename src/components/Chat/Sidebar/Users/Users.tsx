import React from 'react';
import { observer } from 'mobx-react';
import { Box, Stack, StackProps, Text } from '@chakra-ui/react';
import { User } from './User';
import { useChatContext } from '../../context';
import { useRootStore } from '@educt/hooks/useRootStore';
import { Skeleton } from '@chakra-ui/react';

const Wrapper: React.FC<StackProps> = ({ children }) => {
  return (
    <Stack mt='12' maxH='690px' overflowY={'scroll'} pr={{ base: '0', lg: '3' }}>
      {children}
    </Stack>
  );
};

const Users: React.FC = observer(() => {
  const { onlineStore } = useRootStore();
  const { search } = useChatContext();
  const { users } = onlineStore;

  if (users === null)
    return (
      <Wrapper>
        <Skeleton h='90px' borderRadius={'lg'} />
        <Skeleton h='90px' borderRadius={'lg'} />
      </Wrapper>
    );

  const filtered = !search ? users : users.filter(u => u.userName.toLocaleLowerCase().includes(search));
  const isEmpty = filtered.length === 0;

  return (
    <Wrapper>
      {!isEmpty ? (
        filtered.map(u => (
          <User key={u.userId} id={u.userId}>
            <User.Avatar isOnline={onlineStore.isOnline(u.userId) || false} fullname={u.userName} />
            <User.Info fullname={u.userName} lastMessage={''} />
            <User.Time time={'2h'} />
          </User>
        ))
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
