import React, { useContext } from 'react';
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
import { MdModeEdit } from 'react-icons/md';
import { yupResolver } from '@hookform/resolvers/yup';

/**
 * Types
 */
import { UserRoleEnum } from 'enums';

/**
 * Hooks
 */
import { SubmitHandler, useForm } from 'react-hook-form';
import UpdateUserSchema from './EditUserForm.validator';
import { UsersPageContext } from 'contexts';

type UpdateUserInputType = {
  first_name: string;
  last_name: string;
  login: string;
  email: string;
  role: UserRoleEnum;
  password: string;
};
type UpdateUserFormPropsType = {
  onClose: () => void;
  isOpen: boolean;
};

const UpdateUserForm: React.FC<UpdateUserFormPropsType> = ({ onClose, isOpen }) => {
  const { editingUser, setEditingUser } = useContext(UsersPageContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserInputType>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: {
      first_name: editingUser && editingUser.first_name,
      last_name: editingUser && editingUser.last_name,
      email: editingUser && editingUser.email,
    },
  });

  const onSubmit: SubmitHandler<UpdateUserInputType> = data => {
    console.log(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input
                placeholder='First name'
                {...register('first_name')}
                isInvalid={errors.first_name ? true : false}
              />
              {errors.first_name ? <FormHelperText color='red.500'>{errors.first_name.message}</FormHelperText> : null}
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
                <option value={UserRoleEnum.TEACHER}>Teacher</option>
                <option value={UserRoleEnum.ADMIN}>Administrator</option>
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
              mr={1}
              colorScheme='blue'
              loadingText='Saving...'
              leftIcon={<AddIcon />}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                reset({});
                setEditingUser(undefined);
                onClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateUserForm;
