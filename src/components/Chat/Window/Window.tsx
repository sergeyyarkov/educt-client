import React, { useEffect } from 'react';
import { GridItem, GridItemProps, Flex, Box, Icon, Text, Input, Heading, IconButton, Stack } from '@chakra-ui/react';
import { MdOutlineChat, MdSend } from 'react-icons/md';
import { Message } from './Message';

const Window: React.FC<GridItemProps> = props => {
  const chatId = new URLSearchParams(location.search).get('chat_id');

  useEffect(() => {
    console.log('chat id changed!');
  }, [chatId]);

  return (
    <GridItem pt={'7rem'} pb='5' px='12' {...props}>
      {chatId ? (
        <Flex flexDir={'column'}>
          <Box my='3'>
            <Heading as='h2' fontWeight={'semibold'} fontSize='3xl'>
              John Doe
            </Heading>
          </Box>
          <Stack h='65vh' overflowY={'scroll'} mb='12' mt='6' spacing={'3'} pr='8'>
            <Message isMyMessage={false}>
              <Message.Avatar fullname='John Doe' />
              <Message.Text content={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'} time='18:00' />
            </Message>
            <Message isMyMessage={true}>
              <Message.Avatar fullname='Sergey Yarkov' />
              <Message.Text content={'Lorem ipsum dolor sit amet consectetur.'} time='18:00' />
            </Message>
          </Stack>
          <Flex mt='auto' alignItems={'flex-end'}>
            <Input
              resize={'block'}
              type='text'
              placeholder='Write a message...'
              maxW='900px'
              variant={'outline'}
              rounded='xl'
              mr='2'
            />
            <IconButton
              icon={<MdSend />}
              aria-label='Send message'
              variant={'ghost'}
              _hover={{ bg: 'inherit' }}
              _active={{ bg: 'inherit' }}
              _focus={{ outline: 'none' }}
            />
          </Flex>
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
