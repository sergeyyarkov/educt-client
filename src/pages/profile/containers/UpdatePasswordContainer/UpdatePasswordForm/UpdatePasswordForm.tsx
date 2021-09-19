import React, { useContext, useState } from 'react';
import { useRootStore } from 'hooks/useRootStore';
import { Box, Stack } from '@chakra-ui/layout';
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/form-control';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import UpdatePasswordSchema from './UpdatePasswordForm.validator';
import { useToast } from '@chakra-ui/toast';
import { useErrorHandler } from 'react-error-boundary';
import { ProfilePageViewContext } from 'contexts';
import useIsMountedRef from 'hooks/useIsMountedRef';

type UpdatePasswordInputType = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

/**
 * Update password using form
 */
const UpdatePasswordForm: React.FC = () => {
  const { setStatusPageView } = useContext(ProfilePageViewContext);
  const { userStore } = useRootStore();
  const isMountedRef = useIsMountedRef();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<UpdatePasswordInputType>({
    resolver: yupResolver(UpdatePasswordSchema),
  });

  const toast = useToast();
  const handleError = useErrorHandler();

  const onSubmit: SubmitHandler<UpdatePasswordInputType> = async ({ old_password, new_password, confirm_password }) => {
    try {
      setLoading(true);
      await userStore.updateCurrentUserPassword(old_password, new_password);
      toast({ title: 'Password changed.', status: 'success' });
      reset();
      setStatusPageView({ status: 'default' });
    } catch (error: any) {
      if (error.response) {
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
        setLoading(false);
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
              isInvalid={errors.old_password ? true : false}
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
              isInvalid={errors.new_password ? true : false}
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
              isInvalid={errors.confirm_password ? true : false}
              {...register('confirm_password')}
            />
            <FormHelperText color={errors.confirm_password ? 'red' : 'gray.500'}>
              {errors.confirm_password ? errors.confirm_password.message : 'Both passwords must match.'}
            </FormHelperText>
          </FormControl>
        </Stack>
        <Button
          colorScheme='blue'
          mt='4'
          type='submit'
          size='md'
          variant='outline'
          isLoading={loading}
          loadingText='Saving...'
        >
          Change
        </Button>
      </form>
    </Box>
  );
};

export default UpdatePasswordForm;
