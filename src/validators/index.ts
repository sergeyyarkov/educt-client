import * as yup from 'yup';
import validator from 'validator';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { string, StringSchema } from 'yup';

/**
 * Delcare custom methods
 */
yup.addMethod<StringSchema>(
  string,
  'isMobileValid',
  function (
    this: StringSchema,
    locales: validator.MobilePhoneLocale[],
    options?: validator.IsMobilePhoneOptions | undefined
  ) {
    return this.test({
      name: 'isMobileValid',
      message: 'Phone number is not valid',
      test: value => (!value ? true : isMobilePhone(value, locales, options)),
    });
  }
);

export default yup;
