import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { GridItem, GridItemProps, Flex, Box, Icon, Text, Input, Heading, IconButton, Divider } from '@chakra-ui/react';
import { MdOutlineChat, MdSend } from 'react-icons/md';
import { Message, MessageList } from './Message';
import { useRootStore } from '@educt/hooks/useRootStore';
import { SocketContext } from '@educt/contexts';
import { useSocketEvent } from '@educt/hooks/useSocketEvent';
import { MessageType } from '@educt/types';

const Window: React.FC<GridItemProps> = props => {
  const {
    userStore: { me },
    onlineStore,
  } = useRootStore();
  const chatId = new URLSearchParams(location.search).get('chat_id');
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { socket } = useContext(SocketContext);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue === '' || me === null) return;

    const message: MessageType = {
      userName: me.fullname,
      content: inputValue,
      time: new Date().toLocaleTimeString(),
      isMyMessage: true,
    };

    /**
     * Emit event to server and update messages state
     */
    if (chatId) {
      socket?.emit('message:private', {
        content: message.content,
        to: chatId,
      });
      setMessages(prev => [...prev, message]);
      setInputValue('');
    }
  };

  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  useEffect(() => {
    // TODO load message history
    console.log('chat id changed!');
    setMessages([]);
  }, [chatId]);

  // TODO add types for this event
  useSocketEvent('message:private', data => {
    const user = onlineStore.getUser(data.from);
    console.log('message!');

    if (user) {
      if (chatId === data.from) {
        /**
         * Do not add duplicate of message
         */
        if (data.to === data.from) return;

        const message: MessageType = {
          content: data.content,
          userName: user.userName,
          isMyMessage: false,
          time: new Date().toLocaleTimeString(),
        };

        setMessages(prev => [...prev, message]);
      }
    }
  });

  return (
    <GridItem pt={'7rem'} pb='5' px='12' {...props}>
      {chatId ? (
        <Flex flexDir={'column'}>
          <Box my='3'>
            <Heading as='h2' fontWeight={'semibold'} fontSize='3xl'>
              {chatId}
            </Heading>
          </Box>

          <Divider my='2' />

          <MessageList messages={messages}>
            {messages.length !== 0 ? (
              messages.map((message, i) => (
                <Message key={i} isMyMessage={message.isMyMessage}>
                  <Message.Avatar fullname={message.userName} />
                  <Message.Text content={message.content} time={message.time} />
                </Message>
              ))
            ) : (
              <Box>
                <Text mt='5' textAlign={'center'} color='gray.500' userSelect={'none'}>
                  Your message history will be displayed here.
                </Text>
              </Box>
            )}
          </MessageList>
          <form onSubmit={e => onSubmit(e)}>
            <Flex mt='auto' alignItems={'flex-end'}>
              <Input
                onChange={onChangeInputValue}
                value={inputValue}
                resize={'block'}
                type='text'
                placeholder='Write a message...'
                maxW='900px'
                variant={'outline'}
                rounded='xl'
                mr='2'
              />
              <IconButton
                type='submit'
                icon={<MdSend />}
                aria-label='Send message'
                variant={'ghost'}
                _hover={{ bg: 'inherit' }}
                _active={{ bg: 'inherit' }}
                _focus={{ outline: 'none' }}
              />
            </Flex>
          </form>
        </Flex>
      ) : (
        <Box textAlign={'center'} mt={{ base: '0', lg: '15rem' }}>
          <Icon as={MdOutlineChat} color='gray.600' w='16' h='16' />
          <Text color='gray.500' userSelect={'none'}>
            Select a chat to start messaging
          </Text>
        </Box>
      )}
    </GridItem>
  );
};

export { Window };
