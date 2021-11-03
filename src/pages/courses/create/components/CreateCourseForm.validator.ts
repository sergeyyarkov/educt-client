import yup from '@educt/schema';

const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const CreateCourseSchema = yup.object().shape({
  title: yup.string().required('Title field name is required').max(90, 'Title must be at most 90 characters'),
  description: yup.string().required('Description field name is required'),
  image: yup
    .mixed()
    .test('fileSize', 'File size is too large', (value: FileList) => {
      if (!value.length) return true;
      return value[0] && value[0].size <= FILE_SIZE;
    })
    .test('fileFormat', 'This file format is not supported', (value: FileList) => {
      if (!value.length) return true;
      return value[0] && SUPPORTED_FORMATS.includes(value[0].type);
    })
    .optional(),
  category_id: yup.string().required('Category field is required'),
  teacher_id: yup.string().required('Teacher field is required'),
});

export default CreateCourseSchema;
