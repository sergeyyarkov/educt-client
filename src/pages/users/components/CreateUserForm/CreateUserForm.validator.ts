import yup from '@educt/schema';
import { UserRoleEnum } from '@educt/enums';

const CreateUserSchema = yup.object().shape({
  first_name: yup.string().required('First field name is required'),
  last_name: yup.string().required('Last field name is required'),
  login: yup.string().required('Login field is required'),
  email: yup.string().email('Email is invalid').required('Email field is required'),
  role: yup
    .mixed<UserRoleEnum>()
    .required('Role field is required')
    .oneOf(Object.values(UserRoleEnum), `Available roles: ${Object.keys(UserRoleEnum).join(', ')}`),
  password: yup.string().required('Password field is required').min(6, 'Password must be at least 6 characters.'),
});

export default CreateUserSchema;
