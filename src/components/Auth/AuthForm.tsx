import React from 'react';
import { MdAccountCircle, MdVpnKey } from 'react-icons/md';
import { FormControl, FormLabel, InputGroup, Input, InputLeftElement, Button, Icon } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useLoginQuery from 'hooks/useLoginQuery';

type AuthInputs = {
  login: string;
  password: string;
};

const AuthForm: React.FC = () => {
  const { register, reset, handleSubmit } = useForm<AuthInputs>();
  const { login, loading } = useLoginQuery();

  const onSubmit: SubmitHandler<AuthInputs> = async data => {
    try {
      await login(data.login, data.password);
    } catch (error) {
      console.error(error);
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
        isLoading={loading}
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

export default AuthForm;
