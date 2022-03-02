import React from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  InputProps,
  Button,
  Textarea,
  Text,
  TextareaProps,
  Select,
  SelectProps,
  Switch,
  SwitchProps,
  ButtonProps,
} from '@chakra-ui/react';
import { SaveButton } from '@educt/components/Buttons';

/**
 * Hooks
 */
import { useColorMode } from '@chakra-ui/react';
import { useSettingsContext } from '../context';
import { useHistory } from 'react-router-dom';

const InputWithButton: React.FC<
  InputProps & { buttonText?: string | undefined; buttonHandler?: () => void }
> = props => {
  const { buttonText, buttonHandler, ...inputProps } = props;

  return (
    <InputGroup size='md'>
      <Input {...inputProps} />
      <InputRightElement width='4.5rem' pr='0.5rem'>
        <Button onClick={buttonHandler} h='1.75rem' size='sm'>
          {buttonText || 'Click'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export const FullnameInput: React.FC<InputProps> = props => (
  <FormControl isReadOnly>
    <FormLabel>Fullname</FormLabel>
    <Input {...props} />
  </FormControl>
);

export const EmailInput: React.FC<InputProps> = props => {
  const history = useHistory();

  const onChangeEmail = () => history.push(`/profile/change-email`);

  return (
    <FormControl isReadOnly>
      <FormLabel>Email</FormLabel>
      <InputWithButton buttonHandler={onChangeEmail} buttonText='Change' {...props} />
    </FormControl>
  );
};

export const AboutInput: React.FC<TextareaProps> = props => {
  const {
    form: {
      register,
      formState: { errors },
    },
  } = useSettingsContext();

  return (
    <FormControl>
      <FormLabel>About</FormLabel>
      <Textarea minH='130px' maxH='500px' isInvalid={!!errors.about} {...register('about')} {...props} />
      <Text as='small' color='red.500'>
        {errors.about?.message}
      </Text>
      <FormHelperText>Write description for your profile.</FormHelperText>
    </FormControl>
  );
};

export const PhoneInput: React.FC<InputProps> = props => {
  const {
    form: {
      register,
      formState: { errors },
    },
  } = useSettingsContext();

  return (
    <FormControl>
      <FormLabel>Phone</FormLabel>
      <Input
        placeholder='+1 (234) 555-1234'
        isInvalid={!!errors.phone_number}
        {...register('phone_number')}
        {...props}
      />
      <Text as='small' color='red.500'>
        {errors.phone_number?.message}
      </Text>
    </FormControl>
  );
};

export const TwitterInput: React.FC<InputProps> = props => {
  const {
    form: {
      register,
      formState: { errors },
    },
  } = useSettingsContext();

  return (
    <FormControl>
      <FormLabel>Twitter</FormLabel>
      <Input placeholder='@username' isInvalid={!!errors.twitter_id} {...register('twitter_id')} {...props} />
      <Text as='small' color='red.500'>
        {errors.twitter_id?.message}
      </Text>
    </FormControl>
  );
};

export const TelegramInput: React.FC<InputProps> = props => {
  const {
    form: {
      register,
      formState: { errors },
    },
  } = useSettingsContext();

  return (
    <FormControl>
      <FormLabel>Telegram</FormLabel>
      <Input placeholder='@username' isInvalid={!!errors.telegram_id} {...register('telegram_id')} {...props} />
      <Text as='small' color='red.500'>
        {errors.telegram_id?.message}
      </Text>
    </FormControl>
  );
};

export const PasswordInput: React.FC<InputProps> = props => {
  const history = useHistory();

  const onChangePassword = () => history.push(`/profile/change-password`);

  return (
    <FormControl isReadOnly>
      <FormLabel>Password</FormLabel>
      <InputWithButton buttonHandler={onChangePassword} buttonText='Change' {...props} />
    </FormControl>
  );
};

export const LanguageSelect: React.FC<SelectProps> = props => {
  return (
    <FormControl>
      <FormLabel>Display Language</FormLabel>
      <Select {...props}>
        <option value='en'>English</option>
      </Select>
    </FormControl>
  );
};

export const ThemeSwitcher: React.FC<SwitchProps> = props => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Switch onChange={toggleColorMode} size='lg' isChecked={colorMode === 'dark'} {...props} />
    </Box>
  );
};

export const SaveSettingsButton: React.FC<ButtonProps> = props => {
  const {
    form: {
      formState: { isDirty },
    },
    isLoading,
  } = useSettingsContext();

  return (
    <Box>
      <SaveButton type='submit' isLoading={isLoading} isDisabled={!isDirty} {...props} />
    </Box>
  );
};
