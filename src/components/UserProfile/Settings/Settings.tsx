import React from 'react';
import {
  Box,
  BoxProps,
  Heading as ChakraHeading,
  Divider,
  InputProps,
  TextareaProps,
  Stack,
  StackDivider,
  SelectProps,
  ButtonProps,
} from '@chakra-ui/react';
import { Title, ITitleProps } from './Title';
import { Entry } from './Entry';
import { EntryContent } from './EntryContent';
import { SettingsContextProvider } from './SettingsContextProvider';

/**
 * Form input fields
 */
import {
  FullnameInput,
  EmailInput,
  AboutInput,
  PhoneInput,
  TwitterInput,
  TelegramInput,
  PasswordInput,
  LanguageSelect,
  ThemeSwitcher,
  SaveSettingsButton,
} from './Fields';
import { SwitchProps } from 'react-router-dom';

export interface ISettingsComposition {
  Title: React.FC<ITitleProps & BoxProps>;
  Entry: React.FC;
  EntryContent: React.FC;
  FullnameInput: React.FC<InputProps>;
  EmailInput: React.FC<InputProps>;
  AboutInput: React.FC<TextareaProps>;
  PhoneInput: React.FC<InputProps>;
  TwitterInput: React.FC<InputProps>;
  TelegramInput: React.FC<InputProps>;
  PasswordInput: React.FC<InputProps>;
  LanguageSelect: React.FC<SelectProps>;
  ThemeSwitcher: React.FC<SwitchProps>;
  SaveSettingsButton: React.FC<ButtonProps>;
}

const Settings: React.FC<BoxProps> & ISettingsComposition = props => {
  return (
    <SettingsContextProvider>
      <Box maxW={{ base: 'full', lg: '750px' }} {...props}>
        <ChakraHeading as='h2' mt='12' fontSize={'2xl'} fontWeight={'bold'}>
          Account Settings
        </ChakraHeading>
        <Divider my='5' />
        <Stack divider={<StackDivider />} spacing={'5'}>
          {props.children}
        </Stack>
      </Box>
    </SettingsContextProvider>
  );
};

Settings.Title = Title;
Settings.Entry = Entry;
Settings.EntryContent = EntryContent;
Settings.FullnameInput = FullnameInput;
Settings.EmailInput = EmailInput;
Settings.AboutInput = AboutInput;
Settings.PhoneInput = PhoneInput;
Settings.TwitterInput = TwitterInput;
Settings.TelegramInput = TelegramInput;
Settings.PasswordInput = PasswordInput;
Settings.LanguageSelect = LanguageSelect;
Settings.ThemeSwitcher = ThemeSwitcher;
Settings.SaveSettingsButton = SaveSettingsButton;

export { Settings };
