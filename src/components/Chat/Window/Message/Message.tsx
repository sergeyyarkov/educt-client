import React, { memo, useEffect, useRef } from 'react';
import { Flex, Box, Stack, Text as ChakraText } from '@chakra-ui/react';
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

const MessageList: React.FC<{ messages: MessageType[] }> = memo(({ messages }) => {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo(0, listRef.current.scrollHeight);
    }
  }, [messages]);

  return (
    <Stack ref={listRef} h='65vh' overflowY={'scroll'} mb='12' mt='6' spacing={'3'} pr='8'>
      {messages.length !== 0 ? (
        messages.map((message, i) => (
          <Message key={i} isMyMessage={message.isMyMessage}>
            <Message.Avatar fullname={message.userName} />
            <Message.Text content={message.content} time={message.time} />
          </Message>
        ))
      ) : (
        <Box>
          <ChakraText mt='5' textAlign={'center'} color='gray.500' userSelect={'none'}>
            Your message history will be displayed here.
          </ChakraText>
        </Box>
      )}
    </Stack>
  );
});

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
