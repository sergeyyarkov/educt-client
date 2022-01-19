import yup from '@educt/schema';

const AddCategorySchema = yup.object().shape({
  title: yup.string().required('Title field name is required'),
  description: yup.string().optional(),
});

export default AddCategorySchema;
