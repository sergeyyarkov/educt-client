import React, { useEffect } from 'react';
import {
  Box,
  Heading,
  Flex,
  Avatar,
  useColorMode,
  Text,
  Stack,
  Button,
  StackDivider,
  FormControl,
  Input,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormHelperText,
} from '@chakra-ui/react';

import { MdSave } from 'react-icons/md';

import { IPageProps } from 'interfaces';
import { useRootStore } from 'hooks/useRootStore';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import UserBadge from 'components/User/UserBadge';
import LoadingProfilePage from 'components/Loading/LoadingProfilePage';

/**
 * Profile page
 */
const ProfilePage: React.FC<IPageProps> = ({ title }) => {
  const { colorMode } = useColorMode();
  const { userStore, authStore } = useRootStore();
  const history = useHistory();

  useEffect(() => {
    if (!authStore.isLoggedIn) {
      history.push('/auth');
    }
  });

  if (userStore.me === null) {
    return <LoadingProfilePage />;
  }

  return (
    <Box maxW='900px'>
      <Heading as='h1'>My account</Heading>
      <Flex
        alignItems='center'
        mt='20'
        sx={{
          '@media (max-width: 768px)': {
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            mt: '10',
          },
        }}
      >
        <Box>
          <Avatar
            border={`4px solid ${colorMode === 'dark' ? '#2D3748' : '#E2E8F0'}`}
            size='2xl'
            name={`${userStore.me.first_name} ${userStore.me.last_name}`}
          />
        </Box>
        <Flex
          ml='50'
          flexDirection='column'
          sx={{
            '@media (max-width: 768px)': {
              ml: '0',
              mt: '5',
            },
          }}
        >
          <Heading as='h2'>{`${userStore.me.first_name} ${userStore.me.last_name}`}</Heading>
          <Flex
            alignItems='center'
            sx={{
              '@media (max-width: 768px)': {
                flexDirection: 'column',
              },
            }}
          >
            <Text
              mr='10px'
              sx={{
                '@media (max-width: 768px)': {
                  mr: '0',
                  mb: '5px',
                },
              }}
            >
              {userStore.me.email}
            </Text>
            <UserBadge roles={userStore.me.roles} />
          </Flex>
        </Flex>
      </Flex>

      <Box mt='10'>
        <Tabs>
          <TabList>
            <Tab>Account information</Tab>
            <Tab>My contacts</Tab>
          </TabList>
          <TabPanels>
            {/* Account info */}
            <TabPanel padding='10px 0' mt='20px'>
              <Box borderRadius='md' borderWidth='1px' padding='20px'>
                <Heading as='h3' size='lg'>
                  Account information
                </Heading>
                <Stack spacing='10px' mt='20px' divider={<StackDivider />}>
                  <Flex>
                    <Box>
                      <Text as='small' color='gray.500'>
                        First Name
                      </Text>
                      <Text fontWeight='medium' fontSize='lg'>
                        {userStore.me.first_name}
                      </Text>
                    </Box>
                  </Flex>

                  <Flex>
                    <Box>
                      <Text as='small' color='gray.500'>
                        Last Name
                      </Text>
                      <Text fontWeight='medium' fontSize='lg'>
                        {userStore.me.last_name}
                      </Text>
                    </Box>
                  </Flex>

                  <Flex justifyContent='space-between' alignItems='center'>
                    <Box>
                      <Text as='small' color='gray.500'>
                        Email
                      </Text>
                      <Text fontWeight='medium' fontSize='lg'>
                        {userStore.me.email}
                      </Text>
                    </Box>
                    <Button>Edit</Button>
                  </Flex>

                  <Flex justifyContent='space-between' alignItems='center'>
                    <Box>
                      <Text as='small' color='gray.500'>
                        Password
                      </Text>
                      <Text fontWeight='medium' fontSize='lg'>
                        **********
                      </Text>
                    </Box>
                    <Button>Change</Button>
                  </Flex>
                </Stack>
              </Box>
            </TabPanel>

            {/* Contacts */}
            <TabPanel padding='10px 0' mt='20px'>
              <Box as='form'>
                <Box borderRadius='md' borderWidth='1px' padding='20px'>
                  <Heading as='h3' size='lg'>
                    My Contacts
                  </Heading>
                  <Stack spacing='5px' margin='20px 0'>
                    <FormControl id='tel'>
                      <FormHelperText color='gray.500'>Telephone</FormHelperText>
                      <Input type='number' size='md' variant='flushed' placeholder='123-456-7890' />
                    </FormControl>
                    <FormControl id='twitter'>
                      <FormHelperText color='gray.500'>Twitter</FormHelperText>
                      <Input type='text' size='md' variant='flushed' placeholder='https://twitter.com/id' />
                    </FormControl>
                    <FormControl id='telegram'>
                      <FormHelperText color='gray.500'>Telegram</FormHelperText>
                      <Input type='text' size='md' variant='flushed' placeholder='@tag' />
                    </FormControl>
                    <FormControl id='vk'>
                      <FormHelperText color='gray.500'>VKontakte</FormHelperText>
                      <Input type='text' size='md' variant='flushed' placeholder='https://vk.com/id' />
                    </FormControl>
                  </Stack>
                </Box>
                <Button colorScheme='blue' mt='4' type='submit' size='md' variant='outline' rightIcon={<MdSave />}>
                  Save
                </Button>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default observer(ProfilePage);
