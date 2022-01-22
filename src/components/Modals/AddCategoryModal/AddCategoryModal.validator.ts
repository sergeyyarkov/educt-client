import yup from '@educt/schema';

const AddCategorySchema = yup.object().shape({
  title: yup.string().min(2, 'Title must be greater than 2 characters').required('Title field name is required'),
  description: yup.string().optional(),
});

export default AddCategorySchema;
