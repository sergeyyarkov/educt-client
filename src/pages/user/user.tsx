import React from 'react';
import { PageContent, PageWrapper } from '@educt/components/PageElements';
import { IPageProps } from '@educt/interfaces';
import { useFetchUser } from '@educt/hooks/queries/user/useFetchUser';
import { Redirect, useParams } from 'react-router-dom';
import LoadingPage from '@educt/components/LoadingPage';
import {
  Box,
  Button,
  Flex,
  Avatar,
  Text,
  Heading,
  useColorModeValue,
  Icon,
  AvatarBadge,
  Divider,
} from '@chakra-ui/react';
import { MdOutlineMessage } from 'react-icons/md';
import UserBadge from '@educt/components/UserBadge';
import { CalendarIcon, RepeatClockIcon } from '@chakra-ui/icons';

const UserPage: React.FC<IPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, error, isLoading } = useFetchUser(id);
  const color = useColorModeValue('#E2E8F0', '#2D3748');

  if (error?.response?.status === 404) return <Redirect to='/404' />;

  if (user === null || isLoading) return <LoadingPage />;

  return (
    <PageWrapper maxW='800px'>
      <PageContent>
        <Flex>
          <Flex flexDir={'column'} alignItems={'center'}>
            <Avatar border={`4px solid ${color}`} borderColor={color} name={user.fullname} size='2xl'>
              <AvatarBadge boxSize='0.75em' bg='green.500' />
            </Avatar>
            <Button mt='5' variant={'outline'} size={'sm'} leftIcon={<MdOutlineMessage />}>
              Message
            </Button>
          </Flex>
          <Box ml='10'>
            <Flex>
              <Heading as='h2' fontSize={'xl'} fontWeight={'bold'}>
                {user.fullname}&nbsp;&bull;&nbsp;
              </Heading>
              <Box>
                <UserBadge roles={user.roles} />
              </Box>
            </Flex>
            <Flex my={'3'}>
              <Flex>
                <Flex alignItems={'center'} mr='5'>
                  <Icon as={CalendarIcon} color='gray.500' />
                  <Text fontWeight={'medium'} fontSize={'sm'} color='gray.500' ml='1'>
                    Registered: {new Date(user.created_at).toLocaleDateString()}
                  </Text>
                </Flex>
                <Flex alignItems={'center'} mr='5'>
                  <Icon as={RepeatClockIcon} color='gray.500' />
                  <Text fontWeight={'medium'} fontSize={'sm'} color='gray.500' ml='1'>
                    Last login: 3 min ago
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Divider my='3' />
            <Box>
              <Text fontSize={'sm'}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A quibusdam sapiente quisquam vero harum ipsam
                officiis rerum. Cum, excepturi nulla.
              </Text>
            </Box>
          </Box>
        </Flex>
      </PageContent>
    </PageWrapper>
  );
};

export default UserPage;
