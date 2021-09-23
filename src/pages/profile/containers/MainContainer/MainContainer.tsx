import React from 'react';
import { Box, Heading, Flex, Avatar, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';

/**
 * Components
 */
import UserBadge from 'components/UserBadge';
import UserAccountInfo from 'pages/profile/components/UserAccountInfo';
import UpdateUserContactsForm from 'pages/profile/components/UpdateUserContactsForm';
import CourseList from 'pages/profile/components/CourseList';

/**
 * Hooks
 */
import { useRootStore } from 'hooks/useRootStore';
import { useColorMode } from '@chakra-ui/color-mode';

const MainContainer: React.FC = () => {
  const {
    userStore: { me },
  } = useRootStore();
  const { colorMode } = useColorMode();

  if (me === null) return null;

  return (
    <Box maxW='900px'>
      <Heading as='h1'>My account</Heading>
      <Text mt='2'>Update you contacts information or password here.</Text>
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
          <Avatar border={`4px solid ${colorMode === 'dark' ? '#2D3748' : '#E2E8F0'}`} size='2xl' name={me.fullname} />
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
          <Heading as='h2'>{me.fullname}</Heading>
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
          <TabPanels>
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
    </Box>
  );
};

export default MainContainer;
