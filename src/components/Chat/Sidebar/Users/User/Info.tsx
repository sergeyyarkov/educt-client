import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useRootStore } from '@educt/hooks/useRootStore';
import { HistoryMessageType } from '@educt/types';

export interface IInfoProps {
  fullname: string;
  lastMessage?: HistoryMessageType | undefined;
}

const Info: React.FC<IInfoProps> = ({ fullname, lastMessage }) => {
  const {
    userStore: { me },
  } = useRootStore();
  const isMe = me?.fullname === fullname;

  return (
    <Box ml='4' maxW='200px'>
      <Text fontWeight={'semibold'}>
        {isMe ? 'Favorites' : fullname} <br />
        {lastMessage && (
          <Text as={'span'} fontWeight='normal' fontSize={'sm'} color='gray.500' wordBreak={'break-all'}>
            {lastMessage.from === me?.id && `You: `}
            {lastMessage.content.length >= 20 ? lastMessage.content.slice(0, 20 - 1) + '...' : lastMessage.content}
          </Text>
        )}
      </Text>
    </Box>
  );
};

export { Info };
