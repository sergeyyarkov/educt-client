import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdSave } from 'react-icons/md';
import { Text, Input, Button } from '@chakra-ui/react';
import { Box, Heading, Stack } from '@chakra-ui/layout';
import { FormControl, FormHelperText } from '@chakra-ui/form-control';
import { yupResolver } from '@hookform/resolvers/yup';

/**
 * Types
 */
import { IUserContacts } from '@educt/interfaces';

/**
 * Hooks
 */
import { useToast } from '@chakra-ui/toast';
import { useRootStore } from '@educt/hooks/useRootStore';
import { useErrorHandler } from 'react-error-boundary';

/**
 * Schema
 */
import UpdateUserContactsSchema from './UpdateUserContactsForm.validator';

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
    formState: { errors, isDirty },
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
      await userStore.updateCurrentUserContacts(data);
      toast({ title: 'Contacts saved!', status: 'info' });
      reset({
        phone_number: data.phone_number ?? '',
        twitter_id: data.twitter_id ?? '',
        telegram_id: data.telegram_id ?? '',
        vk_id: data.vk_id ?? '',
      });
      setIsLoading(false);
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
        <Box boxShadow='sm' borderRadius='lg' borderWidth='1px' padding='5'>
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
                placeholder='@tw_username'
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
                placeholder='@tg_username'
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
                placeholder='VKontakte id'
                isInvalid={errors.vk_id ? true : false}
                {...register('vk_id')}
              />
              <Text as='small' color='red.500'>
                {errors.vk_id?.message}
              </Text>
            </FormControl>
          </Stack>
        </Box>
        <Button
          colorScheme='blue'
          mt='4'
          type='submit'
          size='md'
          variant='outline'
          isLoading={isLoading}
          loadingText='Saving...'
          rightIcon={<MdSave />}
          isDisabled={!isDirty}
        >
          Save
        </Button>
      </form>
    </Box>
  );
};

export default observer(UpdateUserContactsForm);
