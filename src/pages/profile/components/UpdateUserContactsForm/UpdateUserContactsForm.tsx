import React from 'react';
import * as helpers from '@educt/helpers';
import { observer } from 'mobx-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdSave } from 'react-icons/md';
import { Text, Input } from '@chakra-ui/react';
import { Box, Stack } from '@chakra-ui/layout';
import { FormControl, FormHelperText } from '@chakra-ui/form-control';
import { yupResolver } from '@hookform/resolvers/yup';

/**
 * Types
 */
import { IUserContacts } from '@educt/interfaces';

/**
 * Hooks
 */
import { useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import { useRootStore } from '@educt/hooks/useRootStore';
import { useErrorHandler } from 'react-error-boundary';

/**
 * Schema
 */
import UpdateUserContactsSchema from './UpdateUserContactsForm.validator';
import { SaveButton } from '@educt/components/Buttons';

type UpdateUserContactsInputType = {
  phone_number: string | null;
  twitter_id: string | null;
  telegram_id: string | null;
  vk_id: string | null;
};

type UpdateUserContactsFormPropsType = {
  contacts: IUserContacts | null;
};

const UpdateUserContactsForm: React.FC<UpdateUserContactsFormPropsType> = ({ contacts }) => {
  const {
    register,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
    reset,
  } = useForm<UpdateUserContactsInputType>({
    resolver: yupResolver(UpdateUserContactsSchema),
    defaultValues: {
      phone_number: contacts && (contacts.phone_number ?? ''),
      twitter_id: contacts && (contacts.twitter_id?.replace(/^/, '@') ?? ''),
      telegram_id: contacts && (contacts.telegram_id?.replace(/^/, '@') ?? ''),
      vk_id: contacts && (contacts.vk_id ?? ''),
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userStore } = useRootStore();
  const toast = useToast();
  const handleError = useErrorHandler();

  /**
   * Sumbit form handler
   */
  const onSubmit: SubmitHandler<UpdateUserContactsInputType> = async data => {
    try {
      setIsLoading(true);
      const updatedFields = helpers.getDirtyFields(dirtyFields, data);
      await userStore.updateCurrentUserContacts(updatedFields);
      toast({ title: 'Contacts saved!', status: 'info' });
      reset({
        phone_number: data.phone_number ?? '',
        twitter_id: data.twitter_id ?? '',
        telegram_id: data.telegram_id ?? '',
        vk_id: data.vk_id ?? '',
      });
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 422:
            toast({ title: error.response.data.errors[0].message, status: 'error', duration: 2000 });
            break;
          default:
            handleError(error);
        }
      } else {
        handleError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box borderRadius='lg' borderWidth='1px' padding='5'>
          <Stack spacing='5px'>
            <FormControl id='phone_number'>
              <FormHelperText color='gray.500'>Phone number with country code</FormHelperText>
              <Input
                type='text'
                size='md'
                variant='flushed'
                placeholder='+1 (234) 555-1234'
                isInvalid={errors.phone_number ? true : false}
                {...register('phone_number')}
              />
              <Text as='small' color='red.500'>
                {errors.phone_number?.message}
              </Text>
            </FormControl>

            <FormControl id='twitter_id'>
              <FormHelperText color='gray.500'>Twitter</FormHelperText>
              <Input
                type='text'
                size='md'
                variant='flushed'
                placeholder='@username'
                isInvalid={errors.twitter_id ? true : false}
                {...register('twitter_id')}
              />
              <Text as='small' color='red.500'>
                {errors.twitter_id?.message}
              </Text>
            </FormControl>

            <FormControl id='telegram'>
              <FormHelperText color='gray.500'>Telegram</FormHelperText>
              <Input
                type='text'
                size='md'
                variant='flushed'
                placeholder='@username'
                isInvalid={errors.telegram_id ? true : false}
                {...register('telegram_id')}
              />
              <Text as='small' color='red.500'>
                {errors.telegram_id?.message}
              </Text>
            </FormControl>

            <FormControl id='vk'>
              <FormHelperText color='gray.500'>VKontakte</FormHelperText>
              <Input
                type='text'
                size='md'
                variant='flushed'
                placeholder='username'
                isInvalid={errors.vk_id ? true : false}
                {...register('vk_id')}
              />
              <Text as='small' color='red.500'>
                {errors.vk_id?.message}
              </Text>
            </FormControl>
          </Stack>
        </Box>
        <SaveButton type='submit' mt='4' isLoading={isLoading} rightIcon={<MdSave />} isDisabled={!isDirty} />
      </form>
    </Box>
  );
};

export default observer(UpdateUserContactsForm);
