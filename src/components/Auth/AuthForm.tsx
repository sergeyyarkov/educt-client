import React from 'react';
import { MdAccountCircle, MdVpnKey } from 'react-icons/md';
import { FormControl, FormLabel, InputGroup, Input, InputLeftElement, Button, Icon, useToast } from '@chakra-ui/react';
import { useRootStore } from 'hooks/useRootStore';
import { observer } from 'mobx-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useErrorHandler } from 'react-error-boundary';

type AuthInputs = {
  login: string;
  password: string;
};

const AuthForm: React.FC = () => {
  const { register, reset, handleSubmit } = useForm<AuthInputs>();
  const { authStore } = useRootStore();
  const handleError = useErrorHandler();
  const toast = useToast();

  const onSubmit: SubmitHandler<AuthInputs> = async data => {
    try {
      await authStore.login(data.login, data.password);
      toast({
        title: `👋 Welcome back!`,
        description: 'You are successfully logged in.',
        isClosable: true,
        status: 'success',
      });
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            toast({ title: 'User not found in a system.', status: 'error', duration: 2000 });
            break;
          case 401:
            toast({ title: 'Invalid password.', status: 'error', duration: 2000 });
            break;
          default:
            handleError(error);
            break;
        }
      } else {
        handleError(error);
      }
    } finally {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired={true}>
        <FormLabel>Login</FormLabel>
        <InputGroup>
          <InputLeftElement children={<Icon as={MdAccountCircle} />} />
          <Input type='text' placeholder='Type your login' {...register('login', { required: true })} />
        </InputGroup>
      </FormControl>
      <FormControl mt={5} isRequired={true}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <InputLeftElement children={<Icon as={MdVpnKey} />} />
          <Input type='password' placeholder='********' {...register('password', { required: true })} />
        </InputGroup>
      </FormControl>
      <Button
        loadingText='Logging in...'
        isLoading={authStore.loading}
        type='submit'
        colorScheme='blue'
        variant='outline'
        width='full'
        mt={4}
      >
        Log in
      </Button>
    </form>
  );
};

export default observer(AuthForm);
