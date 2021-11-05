import yup from '@educt/schema';

const LoginSchema = yup.object().shape({
  login: yup.string().required('Login is required'),
  password: yup.string().required('Password is required'),
});

export default LoginSchema;
