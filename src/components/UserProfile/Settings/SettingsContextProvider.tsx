import React from 'react';
import { runInAction } from 'mobx';
import * as helpers from '@educt/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormTypes, SettingsContext } from './context';

/**
 * Hooks
 */
import { useForm } from 'react-hook-form';
import { useRootStore } from '@educt/hooks/useRootStore';
import { useUpdateUserInfo } from '@educt/hooks/queries';

/**
 * Validator
 */
import { SettingsSchema } from './Settings.validator';

const SettingsContextProvider: React.FC = ({ children }) => {
  const {
    userStore: { me },
  } = useRootStore();
  const form = useForm<FormTypes>({
    resolver: yupResolver(SettingsSchema),
    defaultValues: {
      about: me?.about || '',
      phone_number: me?.contacts?.phone_number || '',
      twitter_id: me?.contacts?.twitter_id || '',
      telegram_id: me?.contacts?.telegram_id || '',
    },
  });
  const { updateInfo, isLoading } = useUpdateUserInfo();
  const {
    formState: { dirtyFields },
    reset,
  } = form;

  const onSubmit = async (data: FormTypes) => {
    try {
      const updatedFields = helpers.getDirtyFields(dirtyFields, data);

      const { about, phone_number, telegram_id, twitter_id } = await updateInfo(updatedFields);

      /**
       * Update info in store
       */
      runInAction(() => {
        if (me !== null) {
          me.about = about === undefined ? me.about : about;
          me.contacts = {
            phone_number: phone_number === undefined ? me.contacts?.phone_number || null : phone_number,
            twitter_id: twitter_id === undefined ? me.contacts?.twitter_id || null : twitter_id,
            telegram_id: telegram_id === undefined ? me.contacts?.telegram_id || null : telegram_id,
            vk_id: null,
          };
        }
      });

      reset(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SettingsContext.Provider value={{ form, isLoading }}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </SettingsContext.Provider>
  );
};

export { SettingsContextProvider };
