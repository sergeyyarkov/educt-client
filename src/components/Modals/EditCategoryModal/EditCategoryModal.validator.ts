import yup from '@educt/schema';

const EditCategorySchema = yup.object().shape({
  title: yup.string().optional(),
  desctiption: yup.string().optional(),
});

export default EditCategorySchema;
