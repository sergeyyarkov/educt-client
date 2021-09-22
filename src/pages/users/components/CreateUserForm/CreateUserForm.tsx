import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Select,
  Flex,
  Text,
  Divider,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { MdSupervisorAccount } from 'react-icons/md';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler } from 'react-hook-form';
import CreateUserSchema from './CreateUserModal.validator';

/**
 * Types
 */
import { IMe } from 'interfaces';
import { UserRoleEnum } from 'enums';

/**
 * Hooks
 */
import useIsMountedRef from 'hooks/useIsMountedRef';
import { useDisclosure } from '@chakra-ui/hooks';
import { useForm } from 'react-hook-form';
import { useRootStore } from 'hooks/useRootStore';
import { useErrorHandler } from 'react-error-boundary';
import { useToast } from '@chakra-ui/react';

type CreateUserModalPropsType = {
  me: IMe;
};

type CreateUserInputType = {
  first_name: string;
  last_name: string;
  login: string;
  email: string;
  role: UserRoleEnum;
  password: string;
};

const CreateUserModal: React.FC<CreateUserModalPropsType> = ({ me }) => {
  const { userStore } = useRootStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserInputType>({
    resolver: yupResolver(CreateUserSchema),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const isMountedRef = useIsMountedRef();
  const toast = useToast();
  const handleError = useErrorHandler();

  /**
   * Create new user handler
   */
  const onSubmit: SubmitHandler<CreateUserInputType> = async data => {
    try {
      setLoading(true);
      await userStore.createUser(data);
      /**
       * Clear form state
       */
      reset();

      /**
       * Close modal
       */
      onClose();
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 422) {
          toast({ title: `${error.response.data.errors[0].message}`, status: 'error' });
        } else {
          toast({ title: `${error.message}`, status: 'error' });
        }
      } else {
        handleError(error);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Button onClick={onOpen} variant='outline' colorScheme='blue' leftIcon={<AddIcon />}>
        Create new
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>
              <Flex alignItems='center'>
                <MdSupervisorAccount />
                <Text ml={2}>Create new user</Text>
              </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <Divider />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input
                  placeholder='First name'
                  {...register('first_name')}
                  isInvalid={errors.first_name ? true : false}
                />
                {errors.first_name ? (
                  <FormHelperText color='red.500'>{errors.first_name.message}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Last name</FormLabel>
                <Input placeholder='Last name' {...register('last_name')} isInvalid={errors.last_name ? true : false} />
                {errors.last_name ? <FormHelperText color='red.500'>{errors.last_name.message}</FormHelperText> : null}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Login</FormLabel>
                <Input placeholder='e.g student893' {...register('login')} isInvalid={errors.login ? true : false} />
                {errors.login ? <FormHelperText color='red.500'>{errors.login.message}</FormHelperText> : null}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input placeholder='example@email.com' {...register('email')} isInvalid={errors.email ? true : false} />
                {errors.email ? <FormHelperText color='red.500'>{errors.email.message}</FormHelperText> : null}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Role</FormLabel>
                <Select w='full' mr='2' {...register('role')} isInvalid={errors.role ? true : false}>
                  <option value={UserRoleEnum.STUDENT}>Student</option>
                  {me.isAdmin ? (
                    <>
                      <option value={UserRoleEnum.TEACHER}>Teacher</option>
                      <option value={UserRoleEnum.ADMIN}>Administrator</option>
                    </>
                  ) : null}
                </Select>
                {errors.role ? <FormHelperText color='red.500'>{errors.role.message}</FormHelperText> : null}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input placeholder='******' {...register('password')} isInvalid={errors.password ? true : false} />
                <FormHelperText color={errors.password ? 'red' : 'gray.500'}>
                  {errors.password ? errors.password.message : 'Must be at least 6 characters.'}
                </FormHelperText>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                type='submit'
                variant='outline'
                mr={3}
                colorScheme='blue'
                isLoading={loading}
                loadingText='Creating...'
                leftIcon={<AddIcon />}
              >
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateUserModal;
