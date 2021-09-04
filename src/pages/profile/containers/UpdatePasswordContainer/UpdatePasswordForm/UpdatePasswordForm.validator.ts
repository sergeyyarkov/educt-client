import yup from 'schema';

const UpdatePasswordSchema = yup.object().shape({
  old_password: yup.string().required('Old password is required'),
  new_password: yup
    .string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters.')
    .test('password-unique', 'Password must be different from the old one.', function (value) {
      return this.parent.old_password !== value;
    }),
  confirm_password: yup
    .string()
    .required('Confirm password is required')
    .test('passwords-match', 'Make sure your passwords match.', function (value) {
      return this.parent.new_password === value;
    }),
});

export default UpdatePasswordSchema;
