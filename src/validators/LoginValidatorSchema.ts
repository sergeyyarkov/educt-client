import * as yup from 'yup';

const LoginValidatorSchema = yup.object().shape({
  login: yup.string().required('Login is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default LoginValidatorSchema;
