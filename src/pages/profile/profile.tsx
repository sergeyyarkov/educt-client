import React from 'react';
import {
  InputGroup,
  InputRightElement,
  Flex,
  Switch,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormHelperText,
  Select,
  Button,
} from '@chakra-ui/react';
import { Box, Stack } from '@chakra-ui/layout';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

/**
 *  Components
 */
import { Page } from '@educt/components/PageElements';
import { ProfileLoading } from './components';
import { UserProfile } from '@educt/components/UserProfile';

/**
 * Hooks
 */
import { useRootStore } from '@educt/hooks/useRootStore';
import { observer } from 'mobx-react';
import { MdOutlineSave } from 'react-icons/md';

/**
 * Profile page
 */
const ProfilePage: React.FC<IPageProps> = () => {
  const {
    userStore: { me },
  } = useRootStore();

  if (me === null) return <ProfileLoading />;

  return (
    <Page maxW={'900px'}>
      <Page.Heading heading='My account' description='Update you contacts information or password here.' />
      <Page.Content>
        <UserProfile mt='14'>
          <UserProfile.Base>
            <UserProfile.Avatar name={me.fullname} />
            <UserProfile.Info>
              <UserProfile.Heading fullname={me.fullname} roles={me.roles} />
              <UserProfile.Details registered={me.created_at} lastLogin={me.last_login} />
              <UserProfile.About about={me.about} />
            </UserProfile.Info>
          </UserProfile.Base>

          <UserProfile.Settings>
            {/* Personal Info */}
            <UserProfile.Settings.Entry>
              <UserProfile.Settings.Title title={'Personal Info'} />
              <UserProfile.Settings.EntryContent>
                <Stack spacing={'6'}>
                  <FormControl>
                    <FormLabel>Fullname</FormLabel>
                    <Input />
                  </FormControl>
                  <FormControl isReadOnly>
                    <FormLabel>Email</FormLabel>
                    <InputGroup size='md'>
                      <Input defaultValue={'serzh.yarkov@gmail.com'} />
                      <InputRightElement width='4.5rem' pr='0.5rem'>
                        <Button h='1.75rem' size='sm'>
                          Change
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>About</FormLabel>
                    <Textarea minH='130px' maxH='500px' />
                    <FormHelperText>Write description for your profile.</FormHelperText>
                  </FormControl>
                </Stack>
              </UserProfile.Settings.EntryContent>
            </UserProfile.Settings.Entry>

            {/* Contacts */}
            <UserProfile.Settings.Entry>
              <UserProfile.Settings.Title title={'Contacts'} />
              <UserProfile.Settings.EntryContent>
                <Stack spacing={'6'}>
                  <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Input placeholder='+1 (234) 555-1234' />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Twitter</FormLabel>
                    <Input placeholder='@sergeyyarkov' />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Telegram</FormLabel>
                    <Input placeholder='@sergeyyarkov' />
                  </FormControl>
                </Stack>
              </UserProfile.Settings.EntryContent>
            </UserProfile.Settings.Entry>

            {/* Security */}
            <UserProfile.Settings.Entry>
              <UserProfile.Settings.Title title='Security' />
              <UserProfile.Settings.EntryContent>
                <FormControl isReadOnly>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size='md'>
                    <Input defaultValue={'**********'} />
                    <InputRightElement width='4.5rem' pr='0.5rem'>
                      <Button h='1.75rem' size='sm'>
                        Change
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </UserProfile.Settings.EntryContent>
            </UserProfile.Settings.Entry>

            {/* Language */}
            <UserProfile.Settings.Entry>
              <UserProfile.Settings.Title title='Language' />
              <UserProfile.Settings.EntryContent>
                <FormControl>
                  <FormLabel>Display Language</FormLabel>
                  <Select>
                    <option value='en'>English</option>
                  </Select>
                </FormControl>
              </UserProfile.Settings.EntryContent>
            </UserProfile.Settings.Entry>

            {/* Night Theme */}
            <UserProfile.Settings.Entry>
              <UserProfile.Settings.Title title='Night Theme' />
              <UserProfile.Settings.EntryContent>
                <Flex mt={{ base: '6', md: '0' }}>
                  <Switch size='lg' />
                </Flex>
              </UserProfile.Settings.EntryContent>
            </UserProfile.Settings.Entry>

            <UserProfile.Settings.Entry>
              <UserProfile.Settings.Title />
              <UserProfile.Settings.EntryContent>
                <Box>
                  <Button variant={'outline'} leftIcon={<MdOutlineSave />}>
                    Save
                  </Button>
                </Box>
              </UserProfile.Settings.EntryContent>
            </UserProfile.Settings.Entry>
          </UserProfile.Settings>
        </UserProfile>
      </Page.Content>
    </Page>
  );
};

export default observer(ProfilePage);
