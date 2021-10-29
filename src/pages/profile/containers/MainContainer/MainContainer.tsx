import React from 'react';
import { Box, Heading, Flex, Avatar, Text, Tabs, TabList, Tab, TabPanels, TabPanel, Button } from '@chakra-ui/react';

/**
 * Components
 */
import UserBadge from '@educt/components/UserBadge';
import UserAccountInfo from '@educt/pages/profile/components/UserAccountInfo';
import UpdateUserContactsForm from '@educt/pages/profile/components/UpdateUserContactsForm';
import CourseList from '@educt/pages/profile/components/CourseList';

/**
 * Hooks
 */
import useLogoutQuery from '@educt/hooks/useLogoutQuery';
import { useRootStore } from '@educt/hooks/useRootStore';
import { useColorMode } from '@chakra-ui/color-mode';

const MainContainer: React.FC = () => {
  const {
    userStore: { me },
  } = useRootStore();
  const { colorMode } = useColorMode();
  const { logout } = useLogoutQuery();

  if (me === null) return null;

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
              <UserAccountInfo user={me} />
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

export default MainContainer;
