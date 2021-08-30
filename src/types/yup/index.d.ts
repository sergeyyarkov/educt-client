import validator from 'validator';

declare module 'yup' {
  interface StringSchema {
    isMobileValid(
      locales: validator.MobilePhoneLocale[],
      options?: validator.IsMobilePhoneOptions | undefined
    ): StringSchema;
  }
}
