import React from 'react';
import { observer } from 'mobx-react';
import { Stack } from '@chakra-ui/layout';

/**
 * Types
 */
import type { IPageProps } from '@educt/interfaces';

/**
 *  Components
 */
import { Page } from '@educt/components/PageElements';
import { UserProfile } from '@educt/components/UserProfile';
import LoadingPage from '@educt/components/LoadingPage';

/**
 * Hooks
 */
import { useRootStore } from '@educt/hooks/useRootStore';

/**
 * Profile page
 */
const ProfilePage: React.FC<IPageProps> = () => {
  const {
    userStore: { me },
  } = useRootStore();

  if (me === null) return <LoadingPage />;

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
              <UserProfile.Contacts contacts={me.contacts} />
            </UserProfile.Info>
          </UserProfile.Base>

          <UserProfile.Settings>
            {/* Personal Info */}
            <UserProfile.Settings.Entry>
              <UserProfile.Settings.Title title={'Personal Info'} />
              <UserProfile.Settings.EntryContent>
                <Stack spacing={'6'}>
                  <UserProfile.Settings.FullnameInput defaultValue={me.fullname} />
                  <UserProfile.Settings.EmailInput defaultValue={me.email} />
                  <UserProfile.Settings.AboutInput />
                </Stack>
              </UserProfile.Settings.EntryContent>
            </UserProfile.Settings.Entry>

            {/* Contacts */}
            <UserProfile.Settings.Entry>
              <UserProfile.Settings.Title title={'Contacts'} />
              <UserProfile.Settings.EntryContent>
                <Stack spacing={'6'}>
                  <UserProfile.Settings.PhoneInput />
                  <UserProfile.Settings.TwitterInput />
                  <UserProfile.Settings.TelegramInput />
                </Stack>
              </UserProfile.Settings.EntryContent>
            </UserProfile.Settings.Entry>

            {/* Security */}
            <UserProfile.Settings.Entry>
              <UserProfile.Settings.Title title='Security' />
              <UserProfile.Settings.EntryContent>
                <UserProfile.Settings.PasswordInput defaultValue={'**********'} />
              </UserProfile.Settings.EntryContent>
            </UserProfile.Settings.Entry>

            {/* Language */}
            <UserProfile.Settings.Entry>
              <UserProfile.Settings.Title title='Language' />
              <UserProfile.Settings.EntryContent>
                <UserProfile.Settings.LanguageSelect />
              </UserProfile.Settings.EntryContent>
            </UserProfile.Settings.Entry>

            {/* Night Theme */}
            <UserProfile.Settings.Entry>
              <UserProfile.Settings.Title title='Night Theme' />
              <UserProfile.Settings.EntryContent>
                <UserProfile.Settings.ThemeSwitcher />
              </UserProfile.Settings.EntryContent>
            </UserProfile.Settings.Entry>

            {/* Save Button */}
            <UserProfile.Settings.Entry>
              <UserProfile.Settings.Title />
              <UserProfile.Settings.EntryContent>
                <UserProfile.Settings.SaveSettingsButton />
              </UserProfile.Settings.EntryContent>
            </UserProfile.Settings.Entry>
          </UserProfile.Settings>
        </UserProfile>
      </Page.Content>
    </Page>
  );
};

export default observer(ProfilePage);
