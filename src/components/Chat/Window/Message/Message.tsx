import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Avatar, IAvatarProps } from './Avatar';
import { Text, ITextProps } from './Text';
import { MessageContext } from './context';

interface IMessageComposition {
  Avatar: React.FC<IAvatarProps>;
  Text: React.FC<ITextProps>;
}

interface IMyMessageProps {
  isMyMessage: boolean;
}

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

export { Message };
