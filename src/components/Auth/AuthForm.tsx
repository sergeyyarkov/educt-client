import React from 'react';
import { MdAccountCircle, MdVpnKey } from 'react-icons/md';
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  Icon,
} from '@chakra-ui/react';
import { useRootStore } from '../../hooks/useRootStore';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { SubmitHandler, useForm } from 'react-hook-form';

type AuthInputs = {
  login: string;
  password: string;
};

const AuthForm: React.FC = () => {
  const { register, reset, handleSubmit } = useForm<AuthInputs>();
  const { authStore } = useRootStore();
  const history = useHistory();

  const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
    try {
      await authStore.login(data.login, data.password);
      history.push('/');
    } catch (error) {
      console.log('error while log in ');
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
          <Input
            type='text'
            placeholder='email@mail.com'
            {...register('login', { required: true })}
          />
        </InputGroup>
      </FormControl>
      <FormControl mt={5} isRequired={true}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <InputLeftElement children={<Icon as={MdVpnKey} />} />
          <Input
            type='password'
            placeholder='********'
            {...register('password', { required: true })}
          />
        </InputGroup>
      </FormControl>
      <Button
        loadingText='Logging in...'
        isLoading={authStore.loading}
        type='submit'
        colorScheme='blue'
        variant='outline'
        width='full'
        mt={4}>
        Log in
      </Button>
    </form>
  );
};

export default observer(AuthForm);
