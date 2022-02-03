import React from 'react';
import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
import yup from '@educt/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import * as helpers from '@educt/helpers';
import {
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  FormHelperText,
  Select,
  Button,
} from '@chakra-ui/react';
import { Box, Stack } from '@chakra-ui/layout';

/**
 * Types
 */
import type { IPageProps } from '@educt/interfaces';

/**
 *  Components
 */
import { Page } from '@educt/components/PageElements';
import { UserProfile } from '@educt/components/UserProfile';
import { SwitchDarkThemeButton } from '@educt/components/SwitchDarkThemeButton';
import { SaveButton } from '@educt/components/Buttons';
import LoadingPage from '@educt/components/LoadingPage';

/**
 * Hooks
 */
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRootStore } from '@educt/hooks/useRootStore';
import { useUpdateUserInfo } from '@educt/hooks/queries';

type UpdateProfileInputType = {
  about: string;
  phone_number: string;
  twitter_id: string;
  telegram_id: string;
};

const schema = yup.object().shape({
  about: yup
    .string()
    .max(250, 'Description must be at most 250 characters')
    .transform(val => (!val ? null : val))
    .nullable(true),
  phone_number: yup
    .string()
    .isMobileValid(['en-US', 'ru-RU'], { strictMode: true })
    .transform(val => (!val ? null : val))
    .nullable(true),
  twitter_id: yup
    .string()
    .matches(/(^|[^@\w])@(\w{1,15})\b/, 'Twitter username is not valid')
    .transform(val => (!val ? null : val))
    .nullable(true),
  telegram_id: yup
    .string()
    .matches(/(^|[^@\w])@(\w{1,64})\b/, 'Telegram username is not valid')
    .transform(val => (!val ? null : val))
    .nullable(true),
});

/**
 * Profile page
 */
const ProfilePage: React.FC<IPageProps> = () => {
  const {
    userStore: { me },
  } = useRootStore();
  const { updateInfo, isLoading } = useUpdateUserInfo();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<UpdateProfileInputType>({
    resolver: yupResolver(schema),
    defaultValues: {
      about: me?.about || '',
      phone_number: me?.contacts?.phone_number || '',
      twitter_id: me?.contacts?.twitter_id || '',
      telegram_id: me?.contacts?.telegram_id || '',
    },
  });

  if (me === null) return <LoadingPage />;

  const handleChangePassword = () => history.push(`/profile/change-password`);

  const handleChangeEmail = () => history.push(`/profile/change-email`);

  const handleUpdateProfile = async (data: UpdateProfileInputType) => {
    try {
      const updatedFields = helpers.getDirtyFields(dirtyFields, data);
      const { about, phone_number, telegram_id, twitter_id } = await updateInfo(updatedFields);

      /**
       * Update info in store
       */
      runInAction(() => {
        if (me !== null) {
          me.about = about === undefined ? me.about : about;
          if (me.contacts) {
            me.contacts.phone_number = phone_number === undefined ? me.contacts.phone_number : phone_number;
            me.contacts.twitter_id = twitter_id === undefined ? me.contacts.twitter_id : twitter_id;
            me.contacts.telegram_id = telegram_id === undefined ? me.contacts.telegram_id : telegram_id;
          }
        }
      });

      reset(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page maxW={'900px'}>
      <Page.Heading heading='My account' description='Update your profile information or password here.' />
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

          <form onSubmit={handleSubmit(handleUpdateProfile)}>
            <UserProfile.Settings>
              {/* Personal Info */}
              <UserProfile.Settings.Entry>
                <UserProfile.Settings.Title title={'Personal Info'} />
                <UserProfile.Settings.EntryContent>
                  <Stack spacing={'6'}>
                    <FormControl isReadOnly>
                      <FormLabel>Fullname</FormLabel>
                      <Input defaultValue={me.fullname} />
                    </FormControl>
                    <FormControl isReadOnly>
                      <FormLabel>Email</FormLabel>
                      <InputGroup size='md'>
                        <Input defaultValue={me.email} />
                        <InputRightElement width='4.5rem' pr='0.5rem'>
                          <Button onClick={handleChangeEmail} h='1.75rem' size='sm'>
                            Change
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <FormLabel>About</FormLabel>
                      <Textarea minH='130px' maxH='500px' isInvalid={!!errors.about} {...register('about')} />
                      <Text as='small' color='red.500'>
                        {errors.about?.message}
                      </Text>
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
                      <Input
                        placeholder='+1 (234) 555-1234'
                        isInvalid={!!errors.phone_number}
                        {...register('phone_number')}
                      />
                      <Text as='small' color='red.500'>
                        {errors.phone_number?.message}
                      </Text>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Twitter</FormLabel>
                      <Input placeholder='@username' isInvalid={!!errors.twitter_id} {...register('twitter_id')} />
                      <Text as='small' color='red.500'>
                        {errors.twitter_id?.message}
                      </Text>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Telegram</FormLabel>
                      <Input placeholder='@username' isInvalid={!!errors.telegram_id} {...register('telegram_id')} />
                      <Text as='small' color='red.500'>
                        {errors.telegram_id?.message}
                      </Text>
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
                        <Button onClick={handleChangePassword} h='1.75rem' size='sm'>
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
                  <Box>
                    <SwitchDarkThemeButton />
                  </Box>
                </UserProfile.Settings.EntryContent>
              </UserProfile.Settings.Entry>

              {/* Save Button */}
              <UserProfile.Settings.Entry>
                <UserProfile.Settings.Title />
                <UserProfile.Settings.EntryContent>
                  <Box>
                    <SaveButton type='submit' isLoading={isLoading} isDisabled={!isDirty} />
                  </Box>
                </UserProfile.Settings.EntryContent>
              </UserProfile.Settings.Entry>
            </UserProfile.Settings>
          </form>
        </UserProfile>
      </Page.Content>
    </Page>
  );
};

export default observer(ProfilePage);
