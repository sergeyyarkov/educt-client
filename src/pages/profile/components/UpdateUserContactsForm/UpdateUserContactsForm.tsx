import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdSave } from 'react-icons/md';
import { IUserContacts } from 'interfaces';
import { Box, Heading, Stack } from '@chakra-ui/layout';
import { FormControl, FormHelperText } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Text } from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import { yupResolver } from '@hookform/resolvers/yup';

import UpdateUserContactsSchema from 'validators/UpdateUserContactsSchema';
import useUpdateUserContactsQuery from 'hooks/useUpdateUserContactsQuery';
import { observer } from 'mobx-react';

type UpdateUserContactsInputType = {
  phone_number: string | null;
  twitter_id: string | null;
  telegram_id: string | null;
  vk_id: string | null;
};

type UpdateUserContactsFormProps = {
  contacts: IUserContacts | null;
};

const UpdateUserContactsForm: React.FC<UpdateUserContactsFormProps> = ({ contacts }) => {
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
  const { updateContacts, loading } = useUpdateUserContactsQuery();

  const onSubmit: SubmitHandler<UpdateUserContactsInputType> = data => {
    updateContacts(data).finally(() =>
      reset({
        phone_number: data.phone_number ?? '',
        twitter_id: data.twitter_id ?? '',
        telegram_id: data.telegram_id ?? '',
        vk_id: data.vk_id ?? '',
      })
    );
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box borderRadius='md' borderWidth='1px' padding='20px'>
          <Heading as='h3' size='lg'>
            My Contacts
          </Heading>
          <Stack spacing='5px' margin='20px 0'>
            <FormControl id='phone_number'>
              <FormHelperText color='gray.500'>Phone number with country code</FormHelperText>
              <Input
                type='text'
                size='md'
                variant='flushed'
                placeholder='+1 (234) 555-1234'
                {...register('phone_number')}
              />
              <Text as='small' color='red.500'>
                {errors.phone_number?.message}
              </Text>
            </FormControl>
            <FormControl id='twitter_id'>
              <FormHelperText color='gray.500'>Twitter</FormHelperText>
              <Input type='text' size='md' variant='flushed' placeholder='@tw_username' {...register('twitter_id')} />
              <Text as='small' color='red.500'>
                {errors.twitter_id?.message}
              </Text>
            </FormControl>
            <FormControl id='telegram'>
              <FormHelperText color='gray.500'>Telegram</FormHelperText>
              <Input type='text' size='md' variant='flushed' placeholder='@tg_username' {...register('telegram_id')} />
              <Text as='small' color='red.500'>
                {errors.telegram_id?.message}
              </Text>
            </FormControl>
            <FormControl id='vk'>
              <FormHelperText color='gray.500'>VKontakte</FormHelperText>
              <Input type='text' size='md' variant='flushed' placeholder='VKontakte id' {...register('vk_id')} />
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
          isLoading={loading}
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
