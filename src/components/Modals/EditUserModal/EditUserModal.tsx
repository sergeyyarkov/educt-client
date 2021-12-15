import React from 'react';
import BaseModal from '@educt/components/Modal';

import * as helpers from '@educt/helpers';
import { FormControl, FormLabel, FormHelperText, Input, Select, Stack } from '@chakra-ui/react';
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
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRootStore } from '@educt/hooks/useRootStore';
import { useUpdateUser } from '@educt/hooks/queries';

/**
 * Schema
 */
import EditUserSchema from './EditUserModal.validator';

type EditUserModalPropsType = {
  user: IUser;
  isOpen: boolean;
  onClose: () => void;
  onEdited?: (updatedUser: IUser) => void | undefined;
};

type UpdateUserInputType = {
  first_name: string;
  last_name: string;
  login: string | null;
  email: string;
  role: UserRoleEnum;
  password: string | null;
};

const EditUserModal: React.FC<EditUserModalPropsType> = props => {
  const { user, onClose, onEdited, isOpen } = props;
  const {
    userStore: { me },
  } = useRootStore();
  const { updateUser, isLoading } = useUpdateUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<UpdateUserInputType>({
    resolver: yupResolver(EditUserSchema),
    defaultValues: useMemo(() => {
      return props.user;
    }, [props]),
  });

  if (me === null) return null;

  /**
   * Submit handler
   */
  const onSubmit: SubmitHandler<UpdateUserInputType> = async data => {
    try {
      const params = helpers.getDirtyFields<UpdateUserInputType>(dirtyFields, data);
      const updated = await updateUser(user.id, params);
      onClose();
      onEdited && onEdited(updated);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    reset(props.user);
  }, [props.user]);

  return (
    <BaseModal
      icon={MdModeEdit}
      heading='Edit user'
      confirmText='Save'
      loadingText='Saving...'
      isLoading={isLoading}
      isDisabled={!isDirty}
      isOpen={isOpen}
      onClose={onClose}
      onProceed={handleSubmit(onSubmit)}
    >
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
    </BaseModal>
  );
};

export default EditUserModal;
