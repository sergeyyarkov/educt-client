import React, { useContext } from 'react';
import * as helpers from '@educt/helpers';
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
  Flex,
  Text,
  Divider,
  Select,
  Stack,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { MdModeEdit } from 'react-icons/md';
import { yupResolver } from '@hookform/resolvers/yup';

/**
 * Types
 */
import { IUser } from '@educt/interfaces';
import { UserRoleEnum } from '@educt/enums';
import { SubmitHandler } from 'react-hook-form';

/**
 * Hooks
 */
import { useForm } from 'react-hook-form';
import { useRootStore } from '@educt/hooks/useRootStore';

/**
 * Contexts
 */
import { UsersPageContext } from '@educt/contexts';

/**
 * Schema
 */
import UpdateUserSchema from './EditUserForm.validator';
import { useUpdateUser } from '@educt/hooks/queries';

type UpdateUserFormPropsType = {
  user: IUser;
  isOpen: boolean;
  onClose: () => void;
};

type UpdateUserInputType = {
  first_name: string;
  last_name: string;
  login: string | null;
  email: string;
  role: UserRoleEnum;
  password: string | null;
};

const UpdateUserForm: React.FC<UpdateUserFormPropsType> = ({ user, onClose, isOpen }) => {
  const { userStore } = useRootStore();
  const { setEditingUser } = useContext(UsersPageContext);
  const { updateUser, isLoading } = useUpdateUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<UpdateUserInputType>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.roles[0].slug,
      login: '',
      password: '',
    },
  });

  const { me } = userStore;

  if (me === null) return null;

  /**
   * Submit handler
   */
  const onSubmit: SubmitHandler<UpdateUserInputType> = async data => {
    try {
      const params = helpers.getDirtyFields<UpdateUserInputType>(dirtyFields, data);
      await updateUser(user.id, params);
      onCloseModal();
    } catch (error: any) {
      console.error(error);
    }
  };

  const onCloseModal = () => {
    reset({});
    setEditingUser(undefined);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <Flex alignItems='center'>
              <MdModeEdit />
              <Text ml={2}>Edit user</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody pb={6}>
            <Stack spacing='4'>
              <FormControl isDisabled>
                <FormLabel>Identificator</FormLabel>
                <Input value={user.id} />
              </FormControl>

              <FormControl>
                <FormLabel>New Login</FormLabel>
                <Input placeholder='e.g student001' {...register('login')} isInvalid={!!errors.login} />
                {errors.login && <FormHelperText color='red.500'>{errors.login.message}</FormHelperText>}
              </FormControl>

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
                {errors.role ? <FormHelperText color='red.500'>{errors.role.message}</FormHelperText> : null}
              </FormControl>

              <FormControl>
                <FormLabel>New Password</FormLabel>
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
              loadingText='Saving...'
              isDisabled={!isDirty}
              leftIcon={<CheckIcon />}
            >
              Save
            </Button>
            <Button onClick={onCloseModal}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateUserForm;
