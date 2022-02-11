import React, { ChangeEvent } from 'react';
import axios from 'axios';
import { GridItem, GridItemProps, Flex, Box, Icon, Text, Input, Heading, IconButton, Divider } from '@chakra-ui/react';
import { MdOutlineChat, MdSend } from 'react-icons/md';
import { MessageList } from './Message';
import { SocketContext } from '@educt/contexts';
import { MessageType } from '@educt/types';
import { UserServiceInstance } from '@educt/services';
import { IUser } from '@educt/interfaces';
import LoadingList from '@educt/components/LoadingList';

/**
 * Hooks
 */
import { useContext, useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useSocketEvent } from '@educt/hooks/useSocketEvent';
import { useRootStore } from '@educt/hooks/useRootStore';
import { useHistory } from 'react-router-dom';

const Wrapper: React.FC<GridItemProps> = props => (
  <GridItem pt={'7rem'} pb='5' px='12' {...props}>
    {props.children}
  </GridItem>
);

const Window: React.FC = props => {
  const {
    userStore: { me },
    onlineStore,
  } = useRootStore();
  const chatId = new URLSearchParams(location.search).get('chat_id');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { socket } = useContext(SocketContext);
  const history = useHistory();
  const toast = useToast();

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

  /**
   * Load user data by `chat_id`
   */
  useEffect(() => {
    if (chatId) {
      (async () => {
        try {
          setIsLoading(true);
          const { data: user } = await UserServiceInstance.fetchUserById(chatId);
          setSelectedUser(user);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
              toast({ title: 'Chat not found.', status: 'warning' });
              history.replace({ search: '' });
            }
          }

          console.error(error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [chatId]);

  // TODO load message history
  /**
   * Loading messages history
   */
  useEffect(() => {
    console.log('chat id changed!');
    setMessages([]);
  }, [chatId]);

  // TODO add types for this event
  /**
   * Event on accept new messages
   */
  useSocketEvent('message:private', data => {
    const user = onlineStore.getUser(data.from);

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

  if (isLoading) {
    return (
      <Wrapper>
        <LoadingList />
      </Wrapper>
    );
  }

  /**
   * Unselected user
   */
  if (!chatId || selectedUser === null) {
    return (
      <Wrapper>
        <Box textAlign={'center'} mt={{ base: '0', lg: '15rem' }}>
          <Icon as={MdOutlineChat} color='gray.600' w='16' h='16' />
          <Text color='gray.500' userSelect={'none'}>
            Select a chat to start messaging
          </Text>
        </Box>
      </Wrapper>
    );
  }

  return (
    <Wrapper {...props}>
      <Flex flexDir={'column'}>
        <Box my='3'>
          <Heading as='h2' fontWeight={'semibold'} fontSize='3xl'>
            {selectedUser.fullname}
          </Heading>
        </Box>
        <Divider my='2' />
        <MessageList messages={messages} />
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
    </Wrapper>
  );
};

export { Window };
