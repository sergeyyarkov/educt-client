import yup from '@educt/schema';
// import { UserRoleEnum } from 'enums';

const UpdateUserSchema = yup.object().shape({
  first_name: yup.string().required('First field name is required'),
  last_name: yup.string().required('Last field name is required'),
  email: yup.string().email('Email is invalid').required('Email field is required'),
});

export default UpdateUserSchema;
