import React, { useContext, useState } from 'react';
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
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { MdModeEdit } from 'react-icons/md';
import { yupResolver } from '@hookform/resolvers/yup';
import UpdateUserSchema from './EditUserForm.validator';

/**
 * Types
 */
import { UserRoleEnum } from '@educt/enums';

/**
 * Contexts
 */
import { UsersPageContext } from '@educt/contexts';

/**
 * Hooks
 */
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRootStore } from '@educt/hooks/useRootStore';
import { useErrorHandler } from 'react-error-boundary';
import { useToast } from '@chakra-ui/react';
import useIsMountedRef from '@educt/hooks/useIsMountedRef';

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
  const { userStore } = useRootStore();
  const { editingUser, setEditingUser } = useContext(UsersPageContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<UpdateUserInputType>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: {
      first_name: editingUser && editingUser.first_name,
      last_name: editingUser && editingUser.last_name,
      email: editingUser && editingUser.email,
    },
  });
  const isMountedRef = useIsMountedRef();
  const toast = useToast();
  const handleError = useErrorHandler();

  if (editingUser === undefined) return null;

  const onSubmit: SubmitHandler<UpdateUserInputType> = async data => {
    try {
      setIsLoading(true);
      const params = Object.fromEntries(Object.keys(dirtyFields).map(k => [k, data[k as keyof UpdateUserInputType]]));
      await userStore.updateUser(editingUser.id, params);
      toast({ title: 'User updated.', status: 'info' });
      onCloseModal();
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
        setIsLoading(false);
      }
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
            <FormControl isDisabled>
              <FormLabel>Identificator</FormLabel>
              <Input value={editingUser?.id} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>First name</FormLabel>
              <Input
                placeholder='First name'
                {...register('first_name')}
                isInvalid={errors.first_name ? true : false}
              />
              {errors.first_name && <FormHelperText color='red.500'>{errors.first_name.message}</FormHelperText>}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' {...register('last_name')} isInvalid={errors.last_name ? true : false} />
              {errors.last_name && <FormHelperText color='red.500'>{errors.last_name.message}</FormHelperText>}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input placeholder='example@email.com' {...register('email')} isInvalid={errors.email ? true : false} />
              {errors.email && <FormHelperText color='red.500'>{errors.email.message}</FormHelperText>}
            </FormControl>
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
