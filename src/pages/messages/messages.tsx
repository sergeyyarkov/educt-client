import React from 'react';
import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Heading,
  WrapItem,
  Text,
  Stack,
  Input,
  Icon,
  Button,
  HStack,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Page } from '@educt/components/PageElements';

import { IPageProps } from '@educt/interfaces';
import { MdOutlineChat } from 'react-icons/md';
import { LinkBox, LinkOverlay } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Chat } from '@educt/components/Chat';

/**
 * Messages page
 */
const MessagesPage: React.FC<IPageProps> = () => {
  return (
    <Page maxW='100%' mt='0' mb='0'>
      <Page.Content>
        <Chat>
          <Chat.Sidebar>
            <Flex my='4' justifyContent={'space-between'} alignItems={'center'}>
              <Heading as='h2' fontSize={'md'} fontWeight='medium' mr='9'>
                Chats
              </Heading>
              <InputGroup maxW='230px' size='sm'>
                <InputLeftElement pointerEvents='none'>
                  <SearchIcon color='gray.300' />
                </InputLeftElement>
                <Input type='text' placeholder='Search' borderRadius={'md'} />
              </InputGroup>
            </Flex>
            <HStack>
              <Button isActive variant={'ghost'} size='sm'>
                All
              </Button>
              <Button colorScheme={'blue'} variant='ghost' size='sm'>
                Unread
              </Button>
            </HStack>
            <Stack mt='12' maxH='690px' overflowY={'scroll'} pr='3'>
              {Array(20)
                .fill(0)
                .map((e, i) => i)
                .map(n => (
                  <LinkBox
                    key={n}
                    py='5'
                    px='4'
                    bg={n === 2 ? useColorModeValue('gray.50', 'gray.700') : ''}
                    borderRadius={'lg'}
                    _hover={{ bg: `${useColorModeValue('gray.50', 'gray.700')}` }}
                    transition='all .1s'
                  >
                    <Flex flexDir={'row'} alignItems={'center'}>
                      <WrapItem>
                        <Avatar name='Sergey Yarkov' size='md'>
                          <AvatarBadge boxSize='0.90em' bg='green.500' />
                        </Avatar>
                      </WrapItem>
                      <Box ml='4'>
                        <LinkOverlay as={ReactRouterLink} to='/'>
                          <Text fontWeight={'semibold'}>
                            Sergey Yarkov <br />
                            <Text as={'span'} fontWeight='normal' fontSize={'sm'} color='gray.500'>
                              Sergey: hello, how you doing?
                            </Text>
                          </Text>
                        </LinkOverlay>
                      </Box>
                      <Box alignSelf={'flex-end'} ml='auto'>
                        <Text as='span' color='gray.500'>
                          2h
                        </Text>
                      </Box>
                    </Flex>
                  </LinkBox>
                ))}
            </Stack>
          </Chat.Sidebar>
          <Chat.Window>
            <Flex justifyContent={'center'} mt='20rem'>
              <Box textAlign={'center'}>
                <Icon as={MdOutlineChat} color='gray.600' w='16' h='16' />
                <Text color='gray.500' userSelect={'none'}>
                  Select a chat to start messaging
                </Text>
              </Box>
            </Flex>
          </Chat.Window>
        </Chat>
      </Page.Content>
    </Page>
  );
};

export default MessagesPage;
