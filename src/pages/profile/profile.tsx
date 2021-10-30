import React from 'react';
import { observer } from 'mobx-react';
import { Avatar, Tabs, TabList, Tab, TabPanels, TabPanel, Button } from '@chakra-ui/react';
import { Box, Flex, Heading, Text, Stack, StackDivider } from '@chakra-ui/layout';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

/**
 *  Components
 */
import LoadingPage from './components/LoadingPage';
import UserBadge from '@educt/components/UserBadge';
import UpdateUserContactsForm from '@educt/pages/profile/components/UpdateUserContactsForm';
import CourseList from '@educt/pages/profile/components/CourseList';

/**
 * Hooks
 */
import { useHistory } from 'react-router-dom';
import { useColorMode } from '@chakra-ui/color-mode';
import { useRootStore } from '@educt/hooks/useRootStore';
import useLogoutQuery from '@educt/hooks/useLogoutQuery';

/**
 * Profile page
 */
const ProfilePage: React.FC<IPageProps> = () => {
  const {
    userStore: { me },
  } = useRootStore();
  const history = useHistory();
  const { logout } = useLogoutQuery();
  const { colorMode } = useColorMode();

  if (me === null) return <LoadingPage />;

  return (
    <Box maxW='900px'>
      <Heading as='h1'>My account</Heading>
      <Text mt='2'>Update you contacts information or password here.</Text>
      <Flex
        alignItems='center'
        flexDir={{ base: 'column', md: 'row' }}
        textAlign={{ base: 'center', md: 'left' }}
        mt='20'
      >
        <Box>
          <Avatar border={`4px solid ${colorMode === 'dark' ? '#2D3748' : '#E2E8F0'}`} size='2xl' name={me.fullname} />
        </Box>
        <Flex ml={{ md: '50' }} mt={{ base: '2', md: '0' }} flexDirection='column'>
          <Heading as='h2'>{me.fullname}</Heading>
          <Flex alignItems='center' flexDir={{ base: 'column', md: 'row' }}>
            <Text mr='10px' mb={{ base: '2', md: '0' }}>
              {me.email}
            </Text>
            <UserBadge roles={me.roles} />
          </Flex>
        </Flex>
      </Flex>
      <Box mt='10'>
        <Tabs>
          <TabList>
            <Tab>Account information</Tab>
            <Tab>My contacts</Tab>
            {me.isStudent && <Tab>Available courses</Tab>}
          </TabList>
          <TabPanels mt='2'>
            <TabPanel>
              <Box borderRadius='lg' borderWidth='1px' padding='20px' boxShadow='sm'>
                <Stack spacing='10px' divider={<StackDivider />}>
                  <Flex>
                    <Box>
                      <Text as='small' color='gray.500'>
                        First Name
                      </Text>
                      <Text fontWeight='medium' fontSize='lg'>
                        {me.first_name}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex>
                    <Box>
                      <Text as='small' color='gray.500'>
                        Last Name
                      </Text>
                      <Text fontWeight='medium' fontSize='lg'>
                        {me.last_name}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex justifyContent='space-between' alignItems='center'>
                    <Box>
                      <Text as='small' color='gray.500'>
                        Email
                      </Text>
                      <Text fontWeight='medium' fontSize='lg'>
                        {me.email}
                      </Text>
                    </Box>
                    <Button onClick={() => history.push('/profile/change-email')}>Edit</Button>
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
                    <Button onClick={() => history.push('/profile/change-password')}>Change</Button>
                  </Flex>
                </Stack>
              </Box>
            </TabPanel>
            <TabPanel>
              <UpdateUserContactsForm contacts={me.contacts} />
            </TabPanel>
            {me.isStudent && (
              <TabPanel>
                <CourseList courses={me.courses} />
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </Box>
      <Box textAlign='center' mt='3'>
        <Button onClick={logout} w={{ base: 'full', sm: '150px' }}>
          Sign Out
        </Button>
      </Box>
    </Box>
  );
};

export default observer(ProfilePage);
