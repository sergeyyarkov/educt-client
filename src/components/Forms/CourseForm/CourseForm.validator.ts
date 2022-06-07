import yup from '@educt/schema';

export const FILE_SIZE = 1000 * 1024;
export const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
export const DESCRIPTION_MAX_LENGTH = 250;
export const EDUCATION_DESCRIPTION_MAX_LENGTH = 250;

const CreateCourseSchema = yup.object().shape({
  title: yup.string().required('Title field name is required').max(90, 'Title must be at most 90 characters'),
  description: yup
    .string()
    .required('Description field name is required')
    .max(DESCRIPTION_MAX_LENGTH, 'Description must be at most 250 characters'),
  education_description: yup
    .string()
    .max(EDUCATION_DESCRIPTION_MAX_LENGTH, 'This section must be at most 250 characters')
    .nullable(),
  image: yup
    .mixed()
    .test('fileSize', 'File size is too large', (value: File) => {
      if (!value) return true;
      return value && value.size <= FILE_SIZE;
    })
    .test('fileFormat', 'This file format is not supported', (value: File) => {
      if (!value) return true;
      return value && SUPPORTED_FORMATS.includes(value.type);
    })
    .optional(),
  category_id: yup.string().required('Category field is required'),
  teacher_id: yup.string().required('Teacher field is required'),
});

export default CreateCourseSchema;
