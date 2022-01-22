import yup from '@educt/schema';

const EditCategorySchema = yup.object().shape({
  title: yup.string().min(2, 'Title must be greater than 2 characters').optional(),
  description: yup
    .string()
    .transform(val => (!val ? null : val))
    .nullable(true),
});

export default EditCategorySchema;
