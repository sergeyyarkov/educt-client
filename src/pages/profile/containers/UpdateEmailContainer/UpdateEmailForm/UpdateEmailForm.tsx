import { Button } from '@chakra-ui/button';
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Stack } from '@chakra-ui/layout';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfilePageViewContext } from 'contexts';
import { useRootStore } from 'hooks/useRootStore';
import React, { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import UpdateEmailSchema from './UpdateEmailForm.validator';

type UpdateEmailInputType = {
  email: string;
};

/**
 * Update email using form
 */
const UpdateEmailForm: React.FC = () => {
  const { setStatusPageView } = useContext(ProfilePageViewContext);
  const {
    userStore: { me },
  } = useRootStore();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateEmailInputType>({
    resolver: yupResolver(UpdateEmailSchema),
  });

  const onSubmit: SubmitHandler<UpdateEmailInputType> = async data => {
    console.log(data);
    setStatusPageView({ status: 'confirm-email', data: { confirmEmailData: { newEmail: data.email } } });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing='15px' mt='10'>
          <FormControl id='email'>
            <FormLabel>Current email</FormLabel>
            <Input type='email' size='md' variant='filled' disabled value={me?.email} />
          </FormControl>
          <FormControl id='new_email' isRequired>
            <FormLabel>New email</FormLabel>
            <Input type='email' size='md' variant='filled' placeholder='example@email.com' {...register('email')} />
            <FormHelperText color={errors.email ? 'red' : 'gray.500'}>
              {errors.email ? errors.email.message : 'A confirmation 4-digit code will be sent to this address.'}
            </FormHelperText>
          </FormControl>
        </Stack>
        <Button colorScheme='blue' mt='4' type='submit' size='md' variant='outline' loadingText='Saving...'>
          Send code
        </Button>
      </form>
    </Box>
  );
};

export default UpdateEmailForm;
