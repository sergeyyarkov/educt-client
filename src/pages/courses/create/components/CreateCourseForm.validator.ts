import yup from '@educt/schema';

const MAX_FILE_SIZE = 300 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const CreateCourseSchema = yup.object().shape({
  title: yup.string().required('Title field name is required'),
  description: yup.string().required('Description field name is required'),
  image: yup
    .mixed()
    .test('fileSize', 'File size is too large', (value: File) => value && value.size >= MAX_FILE_SIZE)
    .test('fileFormat', 'Usupported file format', (value: File) => value && SUPPORTED_FORMATS.includes(value.type))
    .optional(),
  category_id: yup.string().required('Category field is required'),
  teacher_id: yup.string().required('Teacher field is required'),
});

export default CreateCourseSchema;
