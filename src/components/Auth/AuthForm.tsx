import React, { useState } from 'react';
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

type AuthFormState = {
  login: string;
  password: string;
};

const AuthForm: React.FC = () => {
  const [authFormState, setAuthFormState] = useState<AuthFormState>({
    login: '',
    password: '',
  });
  const { authStore } = useRootStore();
  const history = useHistory();
  const handleLoginForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { login, password } = authFormState;
    await authStore.login(login, password);
    history.push('/');
  };

  return (
    <form onSubmit={handleLoginForm}>
      <FormControl isRequired={true}>
        <FormLabel>Login</FormLabel>
        <InputGroup>
          <InputLeftElement children={<Icon as={MdAccountCircle} />} />
          <Input
            type='text'
            name='login'
            placeholder='email@mail.com'
            value={authFormState.login}
            onChange={(e) =>
              setAuthFormState({
                ...authFormState,
                login: e.target.value,
              })
            }
          />
        </InputGroup>
      </FormControl>
      <FormControl mt={5} isRequired={true}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <InputLeftElement children={<Icon as={MdVpnKey} />} />
          <Input
            type='password'
            name='password'
            placeholder='********'
            value={authFormState.password}
            onChange={(e) =>
              setAuthFormState({
                ...authFormState,
                password: e.target.value,
              })
            }
          />
        </InputGroup>
      </FormControl>
      <Button
        loadingText='Logging in...'
        type='submit'
        colorScheme='blue'
        variant='outline'
        width='full'
        mt={4}>
        Log in
      </Button>
    </form>
  )
}

export default observer(AuthForm)