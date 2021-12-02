import React from 'react';
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
  Stack,
  Select,
  Flex,
  Text,
  Divider,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { MdSupervisorAccount } from 'react-icons/md';
import { yupResolver } from '@hookform/resolvers/yup';

/**
 * Types
 */
import { UserRoleEnum } from '@educt/enums';
import { SubmitHandler } from 'react-hook-form';

/**
 * Hooks
 */
import { useContext } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { useForm } from 'react-hook-form';
import { useRootStore } from '@educt/hooks/useRootStore';

/**
 * Hooks
 */
import { useCreateUser } from '@educt/hooks/queries';

/**
 * Contexts
 */
import { UsersPageContext } from '@educt/contexts';

/**
 * Schema
 */
import CreateUserSchema from './CreateUserForm.validator';

type CreateUserFormPropsType = {};

type CreateUserInputType = {
  first_name: string;
  last_name: string;
  login: string;
  email: string;
  role: UserRoleEnum;
  password: string;
};

const CreateUserModal: React.FC<CreateUserFormPropsType> = () => {
  const { userStore } = useRootStore();
  const { searchingRole, search } = useContext(UsersPageContext);
  const { createUser, isLoading } = useCreateUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserInputType>({
    resolver: yupResolver(CreateUserSchema),
  });

  const { me } = userStore;

  if (me === null) return null;

  /**
   * Submit handler
   */
  const onSubmit: SubmitHandler<CreateUserInputType> = async data => {
    try {
      await createUser(data, {
        page: userStore.pagination?.current_page,
        limit: userStore.pagination?.per_page,
        role: searchingRole,
        search,
      });

      /**
       * Clear form state
       */
      reset();

      /**
       * Close modal
       */
      onClose();
    } catch (error: any) {
      console.error(error);
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
              <Stack spacing='4'>
                <FormControl isRequired>
                  <FormLabel>First name</FormLabel>
                  <Input placeholder='First name' {...register('first_name')} isInvalid={!!errors.first_name} />
                  {errors.first_name && <FormHelperText color='red.500'>{errors.first_name.message}</FormHelperText>}
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Last name</FormLabel>
                  <Input placeholder='Last name' {...register('last_name')} isInvalid={!!errors.last_name} />
                  {errors.last_name && <FormHelperText color='red.500'>{errors.last_name.message}</FormHelperText>}
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Login</FormLabel>
                  <Input placeholder='e.g student001' {...register('login')} isInvalid={!!errors.login} />
                  {errors.login && <FormHelperText color='red.500'>{errors.login.message}</FormHelperText>}
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input placeholder='example@email.com' {...register('email')} isInvalid={!!errors.email} />
                  {errors.email && <FormHelperText color='red.500'>{errors.email.message}</FormHelperText>}
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Role</FormLabel>
                  <Select w='full' mr='2' {...register('role')} isInvalid={!!errors.role}>
                    <option value={UserRoleEnum.STUDENT}>Student</option>
                    {me.isAdmin && (
                      <>
                        <option value={UserRoleEnum.TEACHER}>Teacher</option>
                        <option value={UserRoleEnum.ADMIN}>Administrator</option>
                      </>
                    )}
                  </Select>
                  {errors.role && <FormHelperText color='red.500'>{errors.role.message}</FormHelperText>}
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input placeholder='******' {...register('password')} isInvalid={!!errors.password} />
                  <FormHelperText color={errors.password ? 'red' : 'gray.500'}>
                    {errors.password ? errors.password.message : 'Must be at least 6 characters.'}
                  </FormHelperText>
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                type='submit'
                variant='outline'
                mr={3}
                colorScheme='blue'
                isLoading={isLoading}
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
