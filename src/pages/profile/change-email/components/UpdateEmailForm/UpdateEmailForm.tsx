import React from 'react';
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Stack } from '@chakra-ui/layout';
import { yupResolver } from '@hookform/resolvers/yup';

/**
 * Types
 */
import type { SubmitHandler } from 'react-hook-form';

/**
 * Hooks
 */
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateUserEmail } from '@educt/hooks/queries';

/**
 * Contexts
 */
import { ChangeEmailPageContext } from '@educt/contexts';

/**
 * Schema
 */
import UpdateEmailSchema from './UpdateEmailForm.validator';
import { SaveButton } from '@educt/components/Buttons';

type UpdateEmailInputType = {
  email: string;
};

type UpdateEmailFormPropsType = {
  currentEmail: string;
};

/**
 * Send confirmation code before change email using form
 */
const UpdateEmailForm: React.FC<UpdateEmailFormPropsType> = ({ currentEmail }) => {
  const [newEmail, setNewEmail] = useState<string | null>(null);
  const { setIsCodeSent, setConfirmEmailData } = useContext(ChangeEmailPageContext);
  const { sendConfirmationCode, isLoading, data } = useUpdateUserEmail();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateEmailInputType>({
    resolver: yupResolver(UpdateEmailSchema),
  });

  /**
   * Change page view in confirmation code has been sent
   */
  useEffect(() => {
    if (newEmail !== null && data !== null) {
      setIsCodeSent(true);
      setConfirmEmailData({ newEmail, expired_seconds: data.expired_seconds });
    }
  }, [data]);

  /**
   * Submit form handler
   */
  const onSubmit: SubmitHandler<UpdateEmailInputType> = async ({ email }) => {
    /**
     * Set new email state and send confirmation code
     */
    setNewEmail(email);
    await sendConfirmationCode(email);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing='15px' mt='10'>
          <FormControl id='email'>
            <FormLabel>Current email</FormLabel>
            <Input type='email' size='md' variant='filled' disabled value={currentEmail} />
          </FormControl>
          <FormControl id='new_email' isRequired>
            <FormLabel>New email</FormLabel>
            <Input type='email' size='md' variant='filled' placeholder='example@email.com' {...register('email')} />
            <FormHelperText color={errors.email ? 'red' : 'gray.500'}>
              {errors.email ? errors.email.message : 'A confirmation 4-digit code will be sent to this address.'}
            </FormHelperText>
          </FormControl>
        </Stack>
        <SaveButton mt='4' type='submit' isLoading={isLoading} />
      </form>
    </Box>
  );
};

export default UpdateEmailForm;
