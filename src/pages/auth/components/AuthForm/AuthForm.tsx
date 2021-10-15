import React from 'react';
import { MdAccountCircle, MdSchool, MdVpnKey } from 'react-icons/md';
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
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useLoginQuery from '@educt/hooks/useLoginQuery';
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

  const onSubmit: SubmitHandler<AuthInputType> = data => {
    login(data.login, data.password).finally(() => reset());
  };

  return (
    <Box w='full' maxW='450px' borderWidth='1px' borderRadius='lg' p='8'>
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
                <Input type='text' placeholder='Login' {...register('login')} isInvalid={errors.login ? true : false} />
              </InputGroup>
              <Text as='small' color='red.500'>
                {errors.login?.message}
              </Text>
            </FormControl>
            <FormControl mt={5}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <InputLeftElement children={<Icon as={MdVpnKey} />} />
                <Input
                  type='password'
                  placeholder='******'
                  {...register('password')}
                  isInvalid={errors.password ? true : false}
                />
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
