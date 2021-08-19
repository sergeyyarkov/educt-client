import React, { useState } from 'react';
import { MdAccountCircle, MdVpnKey } from 'react-icons/md';
import {
  Flex,
  Box,
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

type LoginDataInput = {
  login: string;
  password: string;
};

/**
 * Authorize user through a form.
 */
const Auth: React.FC = () => {
  const [loginFormData, setLoginFormData] = useState<LoginDataInput>({
    login: '',
    password: '',
  });
  const { authStore } = useRootStore();
  const history = useHistory();

  const handleLoginForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { login, password } = loginFormData;
    await authStore.login(login, password);
    history.push('/');
  };

  return (
    <Flex minHeight='100vh' align='center' justifyContent='center'>
      <Box
        p={8}
        my={40}
        width='full'
        maxWidth='450px'
        borderWidth={1}
        borderRadius={8}>
        <Box textAlign='center'>
          <Flex justifyContent='center'>
            {/* <LogoIcon viewBox='0 0 24 24' boxSize={'64px'} fill='blue.600' /> */}
          </Flex>
        </Box>
        <Box my='30px'>
          <form onSubmit={handleLoginForm}>
            <FormControl isRequired={true}>
              <FormLabel>Login</FormLabel>
              <InputGroup>
                <InputLeftElement children={<Icon as={MdAccountCircle} />} />
                <Input
                  type='text'
                  name='login'
                  placeholder='email@mail.com'
                  value={loginFormData.login}
                  onChange={(e) =>
                    setLoginFormData({
                      ...loginFormData,
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
                  value={loginFormData.password}
                  onChange={(e) =>
                    setLoginFormData({
                      ...loginFormData,
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
        </Box>
      </Box>
    </Flex>
  );
};

export default observer(Auth);
