import React from 'react';
import { Box, Stack, Text } from '@chakra-ui/react';
import { User } from './User';
import { useChatContext } from '../../context';

const tempDb = [
  { id: 'user-1', name: 'Trace Kerluke', lastMessage: 'Hello.', time: '2g' },
  { id: 'user-2', name: 'Dalton Conn ', lastMessage: 'Hello, how you doing ?', time: '30m' },
  { id: 'user-3', name: 'Cleo Hane', lastMessage: 'Hi.', time: '1h' },
];

const Users: React.FC = () => {
  const { search } = useChatContext();

  const filtered = !search ? tempDb : tempDb.filter(u => u.name.toLocaleLowerCase().includes(search));
  const isEmpty = filtered.length === 0;

  return (
    <Stack mt='12' maxH='690px' overflowY={'scroll'} pr={{ base: '0', lg: '3' }}>
      {!isEmpty ? (
        filtered.map(u => (
          <User key={u.id} id={u.id}>
            <User.Avatar isOnline={false} fullname={u.name} />
            <User.Info fullname={u.name} lastMessage={u.lastMessage} />
            <User.Time time={u.time} />
          </User>
        ))
      ) : (
        <Box textAlign={'center'}>
          <Text userSelect={'none'} color='gray.500'>
            Cannot find any chat
          </Text>
        </Box>
      )}
    </Stack>
  );
};

export { Users };
