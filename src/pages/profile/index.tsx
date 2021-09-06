import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Flex,
  Avatar,
  useColorMode,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { IPageProps } from 'interfaces';
import { ProfilePageStatusType } from 'types';
import { useRootStore } from 'hooks/useRootStore';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { ProfilePageViewContext } from 'contexts';
import UserBadge from 'components/UserBadge';
import LoadingPage from './components/LoadingPage';
import UserAccountInfo from './components/UserAccountInfo';
import UpdateUserContactsForm from './components/UpdateUserContactsForm';
import UpdatePasswordContainer from './containers/UpdatePasswordContainer';
import UpdateEmailContainer from './containers/UpdateEmailContainer';
import ConfirmEmailContainer from './containers/ConfirmEmailContainer';

/**
 * Profile page
 */
const ProfilePage: React.FC<IPageProps> = () => {
  const [statusPageView, setStatusPageView] = useState<ProfilePageStatusType>({ status: 'default' });
  const { colorMode } = useColorMode();
  const { userStore, authStore } = useRootStore();
  const history = useHistory();

  useEffect(() => {
    if (!authStore.isLoggedIn) {
      history.push('/auth');
    }
  });

  if (userStore.me === null) {
    return <LoadingPage />;
  }

  return (
    <ProfilePageViewContext.Provider value={{ statusPageView: statusPageView.status, setStatusPageView }}>
      {statusPageView.status === 'default' && (
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
                name={userStore.me.fullname}
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
              <Heading as='h2'>{userStore.me.fullname}</Heading>
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
                <TabPanel padding='10px 0' mt='20px'>
                  <UserAccountInfo user={userStore.me} />
                </TabPanel>
                <TabPanel padding='10px 0' mt='20px'>
                  <UpdateUserContactsForm contacts={userStore.me.contacts} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      )}
      {statusPageView.status === 'update-password' && <UpdatePasswordContainer />}
      {statusPageView.status === 'update-email' && <UpdateEmailContainer />}
      {statusPageView.status === 'confirm-email' && statusPageView.data?.confirmEmailData && (
        <ConfirmEmailContainer data={statusPageView.data.confirmEmailData} />
      )}
    </ProfilePageViewContext.Provider>
  );
};

export default observer(ProfilePage);
