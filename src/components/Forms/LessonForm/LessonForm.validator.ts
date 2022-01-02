import yup from '@educt/schema';

const LessonFormSchema = yup.object().shape({
  title: yup.string().required('Title field name is required').max(90, 'Title must be at most 90 characters'),
  description: yup
    .string()
    .required('Description field name is required')
    .max(250, 'Description must be at most 250 characters'),
});

export default LessonFormSchema;
