import yup from 'validators';

const UpdatePasswordSchema = yup.object().shape({
  old_password: yup.string().required('Old password is required'),
  new_password: yup.string().required('New password is required').min(6, 'Password bust be at least 6 characters.'),
  confirm_password: yup
    .string()
    .required('Confirm password is required')
    .test('passwords-match', 'Make sure your passwords match.', function (value) {
      return this.parent.new_password === value;
    }),
});

export default UpdatePasswordSchema;
