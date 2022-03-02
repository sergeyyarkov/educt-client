import React from 'react';
import { Box, Stack } from '@chakra-ui/layout';
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { SaveButton } from '@educt/components/Buttons';
import { yupResolver } from '@hookform/resolvers/yup';

/**
 * Types
 */
import type { SubmitHandler } from 'react-hook-form';

/**
 * Hooks
 */
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { useErrorHandler } from 'react-error-boundary';
import { useRootStore } from '@educt/hooks/useRootStore';
import useIsMountedRef from '@educt/hooks/useIsMountedRef';
import { useToast } from '@chakra-ui/toast';

/**
 * Schema
 */
import UpdatePasswordSchema from './UpdatePasswordForm.validator';

type UpdatePasswordInputType = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

/**
 * Update password using form
 */
const UpdatePasswordForm: React.FC = () => {
  const { userStore } = useRootStore();
  const isMountedRef = useIsMountedRef();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<UpdatePasswordInputType>({
    resolver: yupResolver(UpdatePasswordSchema),
  });
  const history = useHistory();
  const toast = useToast();
  const handleError = useErrorHandler();

  /**
   *  Submit form handler
   */
  const onSubmit: SubmitHandler<UpdatePasswordInputType> = async ({ old_password, new_password, confirm_password }) => {
    try {
      setIsLoading(true);
      await userStore.updateCurrentUserPassword(old_password, new_password);
      toast({ title: 'Password changed.', status: 'success' });
      reset();
      history.push('/profile');
    } catch (error: any) {
      if (error.response) {
        /**
         * Invalid current password handler
         */
        if (error.response.status === 401) {
          toast({ title: 'Invalid current password.', status: 'error', duration: 2000 });
          reset({ old_password: '', new_password, confirm_password });
          setFocus('old_password');
        } else {
          handleError(error);
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

  return (
    <Box maxW='700px'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing='15px' mt='10'>
          <FormControl id='old_password' isRequired>
            <FormLabel>Old password</FormLabel>
            <Input
              type='text'
              size='md'
              variant='filled'
              placeholder='*******'
              isInvalid={!!errors.old_password}
              {...register('old_password')}
            />
            <FormHelperText color='gray.500'>Type your current password.</FormHelperText>
          </FormControl>
          <FormControl id='new_password' isRequired>
            <FormLabel>New password</FormLabel>
            <Input
              type='text'
              size='md'
              variant='filled'
              placeholder='*******'
              isInvalid={!!errors.new_password}
              {...register('new_password')}
            />
            <FormHelperText color={errors.new_password ? 'red' : 'gray.500'}>
              {errors.new_password ? errors.new_password.message : 'Must be at least 6 characters.'}
            </FormHelperText>
          </FormControl>
          <FormControl id='confirm_password' isRequired>
            <FormLabel>Confirm new password</FormLabel>
            <Input
              type='text'
              size='md'
              variant='filled'
              placeholder='*******'
              isInvalid={!!errors.confirm_password}
              {...register('confirm_password')}
            />
            <FormHelperText color={errors.confirm_password ? 'red' : 'gray.500'}>
              {errors.confirm_password ? errors.confirm_password.message : 'Both passwords must match.'}
            </FormHelperText>
          </FormControl>
        </Stack>
        <SaveButton mt='4' type='submit' isLoading={isLoading} />
      </form>
    </Box>
  );
};

export default UpdatePasswordForm;
