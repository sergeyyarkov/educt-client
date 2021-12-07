import React from 'react';
import {
  Avatar,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Box, Stack } from '@chakra-ui/layout';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

/**
 *  Components
 */
import { PageHeading, PageContent, PageWrapper, PageFooter } from '@educt/components/PageElements';
import { ProfileAvatar, ProfileBaseInfo, ProfileDescription, ProfileLoading, ProfileSignOutButton } from './components';
import { CourseList } from './components/CourseList';
import UpdateUserContactsForm from '@educt/pages/profile/components/UpdateUserContactsForm';

/**
 * Hooks
 */
import { useHistory } from 'react-router-dom';
import { useRootStore } from '@educt/hooks/useRootStore';

/**
 * Profile page
 */
const ProfilePage: React.FC<IPageProps> = () => {
  const {
    userStore: { me },
  } = useRootStore();
  const history = useHistory();

  if (me === null) return <ProfileLoading />;

  return (
    <PageWrapper maxW='900px'>
      <PageHeading heading='My account' description='Update you contacts information or password here.' />
      <ProfileBaseInfo mt='20'>
        <ProfileAvatar name={me.fullname} />
        <ProfileDescription fullname={me.fullname} email={me.email} roles={me.roles} />
      </ProfileBaseInfo>
      <PageContent>
        <Tabs>
          <TabList>
            <Tab>Account information</Tab>
            <Tab>My contacts</Tab>
            {me.isStudent && <Tab>Available courses</Tab>}
          </TabList>
          <TabPanels mt='2'>
            <TabPanel>
              <form>
                <Box borderRadius='md' borderWidth='1px' padding='5'>
                  <Stack spacing='5px'>
                    <FormControl isDisabled>
                      <FormHelperText color='gray.500'>First name</FormHelperText>
                      <Input type='text' value={me.first_name} size='md' variant='flushed' />
                    </FormControl>

                    <FormControl isDisabled>
                      <FormHelperText color='gray.500'>Last name</FormHelperText>
                      <Input type='text' value={me.last_name} size='md' variant='flushed' />
                    </FormControl>

                    <FormControl isDisabled>
                      <FormHelperText color='gray.500'>Email</FormHelperText>
                      <InputGroup>
                        <Input type='text' value={me.email} size='md' variant='flushed' />
                        <InputRightElement width='4rem'>
                          <Button size='sm' h='1.90rem' w='full' onClick={() => history.push('/profile/change-email')}>
                            Edit
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>

                    <FormControl isDisabled>
                      <FormHelperText color='gray.500'>Password</FormHelperText>
                      <InputGroup>
                        <Input type='text' value='**********' size='md' variant='flushed' />
                        <InputRightElement width='5rem'>
                          <Button
                            size='sm'
                            h='1.90rem'
                            w='full'
                            onClick={() => history.push('/profile/change-password')}
                          >
                            Change
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  </Stack>
                </Box>
              </form>
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
      </PageContent>
      <PageFooter textAlign='center'>
        <ProfileSignOutButton />
      </PageFooter>
    </PageWrapper>
  );
};

export default ProfilePage;
