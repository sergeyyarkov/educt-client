import yup from '@educt/schema';

const SettingsSchema = yup.object().shape({
  about: yup
    .string()
    .max(250, 'Description must be at most 250 characters')
    .transform(val => (!val ? null : val))
    .nullable(true),
  phone_number: yup
    .string()
    .isMobileValid(['en-US', 'ru-RU'], { strictMode: true })
    .transform(val => (!val ? null : val))
    .nullable(true),
  twitter_id: yup
    .string()
    .matches(/(^|[^@\w])@(\w{1,15})\b/, 'Twitter username is not valid')
    .transform(val => (!val ? null : val))
    .nullable(true),
  telegram_id: yup
    .string()
    .matches(/(^|[^@\w])@(\w{1,64})\b/, 'Telegram username is not valid')
    .transform(val => (!val ? null : val))
    .nullable(true),
});

export { SettingsSchema };
