import React, { useEffect, useRef } from 'react';
import { Flex, Stack } from '@chakra-ui/react';
import { Avatar, IAvatarProps } from './Avatar';
import { Text, ITextProps } from './Text';
import { MessageContext } from './context';
import { MessageType } from '@educt/types';

interface IMessageComposition {
  Avatar: React.FC<IAvatarProps>;
  Text: React.FC<ITextProps>;
}

interface IMyMessageProps {
  isMyMessage: boolean;
}

const MessageList: React.FC<{ messages: MessageType[] }> = ({ messages, children }) => {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo(0, listRef.current.scrollHeight);
    }
  }, [messages]);

  return (
    <Stack ref={listRef} h='65vh' overflowY={'scroll'} mb='12' mt='6' spacing={'3'} pr='8'>
      {children}
    </Stack>
  );
};

const Message: React.FC<IMyMessageProps> & IMessageComposition = ({ children, isMyMessage }) => {
  return (
    <MessageContext.Provider value={{ isMyMessage }}>
      <Flex flexDir={!isMyMessage ? 'row' : 'row-reverse'} alignItems={'center'}>
        {children}
      </Flex>
    </MessageContext.Provider>
  );
};

Message.Avatar = Avatar;
Message.Text = Text;

export { MessageList, Message };
