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
  Flex,
  Box,
} from '@chakra-ui/react';
import { MdAccountCircle, MdSchool, MdVpnKey } from 'react-icons/md';
import { yupResolver } from '@hookform/resolvers/yup';

/**
 * Types
 */
import type { SubmitHandler } from 'react-hook-form';

/**
 * Hooks
 */
import { useForm } from 'react-hook-form';
import useLoginQuery from '@educt/hooks/useLoginQuery';

/**
 * Schema
 */
import LoginSchema from './AuthForm.validator';

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
  const { login, loading } = useLoginQuery();

  /**
   * Login handler
   */
  const onSubmit: SubmitHandler<AuthInputType> = data => {
    login(data.login, data.password).finally(() => reset());
  };

  return (
    <Box flexBasis='500px' borderWidth='1px' borderRadius='lg' p='8'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex justifyContent='center' alignItems='center'>
          <Box w='full'>
            <Box textAlign='center'>
              <Flex justifyContent='center'>
                <Box as={MdSchool} color='blue.500' size='64px' />
              </Flex>
            </Box>
            <FormControl>
              <FormLabel>Login</FormLabel>
              <InputGroup>
                <InputLeftElement children={<Icon as={MdAccountCircle} />} />
                <Input type='text' placeholder='Login' {...register('login')} isInvalid={!!errors.login} />
              </InputGroup>
              <Text as='small' color='red.500'>
                {errors.login?.message}
              </Text>
            </FormControl>

            <FormControl mt={5}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <InputLeftElement children={<Icon as={MdVpnKey} />} />
                <Input type='password' placeholder='******' {...register('password')} isInvalid={!!errors.password} />
              </InputGroup>
              <Text as='small' color='red.500'>
                {errors.password?.message}
              </Text>
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
          </Box>
        </Flex>
      </form>
    </Box>
  );
};

export default AuthForm;
