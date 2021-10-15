import yup from '@educt/schema';

const UpdateUserContactsSchema = yup.object().shape({
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
  vk_id: yup
    .string()
    .matches(/^([a-zA-Z0-9_]){1,64}$/, 'VKontakte username is not valid')
    .transform(val => (!val ? null : val))
    .nullable(true),
});

export default UpdateUserContactsSchema;
