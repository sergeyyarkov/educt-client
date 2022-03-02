import { createContext, useContext } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface ISettingsContext {
  form: UseFormReturn<FormTypes, object>;
  isLoading: boolean;
}

export type FormTypes = {
  about: string;
  phone_number: string;
  twitter_id: string;
  telegram_id: string;
};

export const SettingsContext = createContext<ISettingsContext | undefined>(undefined);

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('SettingsContext was outside of its provider');
  }

  return context;
};
