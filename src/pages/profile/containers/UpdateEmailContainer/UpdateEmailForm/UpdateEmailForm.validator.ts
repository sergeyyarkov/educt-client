import yup from '@educt/schema';

const UpdateEmailSchema = yup.object().shape({
  email: yup.string().required('Email address is required.').email('Please type your email correctly.'),
});

export default UpdateEmailSchema;
