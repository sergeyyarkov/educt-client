import React from 'react';
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  Icon,
  Text,
  Stack,
} from '@chakra-ui/react';
import { MdAccountCircle } from 'react-icons/md';
import { yupResolver } from '@hookform/resolvers/yup';

/**
 * Types
 */
import type { SubmitHandler } from 'react-hook-form';

/**
 * Hooks
 */
import { useForm } from 'react-hook-form';
import { useLogin } from '@educt/hooks/queries';

/**
 * Schema
 */
import LoginSchema from './AuthForm.validator';
import { PasswordField } from '@educt/components/Fields/PasswordField';

type AuthInputType = {
  login: string;
  password: string;
};

const AuthForm: React.FC = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<AuthInputType>({
    resolver: yupResolver(LoginSchema),
  });
  const { login, isLoading } = useLogin();

  /**
   * Login handler
   */
  const onSubmit: SubmitHandler<AuthInputType> = data => login(data.login, data.password).finally(() => reset());

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing='6'>
        <FormControl id='login'>
          <FormLabel>Login</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <Icon as={MdAccountCircle} />
            </InputLeftElement>
            <Input type='text' placeholder='Login' {...register('login')} isInvalid={!!errors.login} />
          </InputGroup>
          <Text as='small' color='red.500'>
            {errors.login?.message}
          </Text>
        </FormControl>

        <PasswordField
          {...register('password')}
          placeholder='******'
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
        />

        <Button
          type='submit'
          colorScheme='blue'
          size='lg'
          fontSize='md'
          loadingText='Logging in...'
          isLoading={isLoading}
          width='full'
          mt={4}
        >
          Log in
        </Button>
      </Stack>
    </form>
  );
};

export default AuthForm;
