import * as helpers from '@educt/helpers';
import yup from '@educt/schema';

const VIDEO_FILE_SIZE = 5000 * 1024 * 1024;
const MATERIAL_FILE_SIZE = 100000 * 1024;

const LessonFormSchema = yup.object().shape({
  title: yup.string().required('Title field name is required').max(90, 'Title must be at most 90 characters'),
  description: yup
    .string()
    .required('Description field name is required')
    .max(250, 'Description must be at most 250 characters'),
  duration: yup.string().required('Duration field name is required'),
  video: yup
    .mixed()
    .test(
      'fileSize',
      `File size is too large, maximum size is ${helpers.transformBytes(VIDEO_FILE_SIZE)}`,
      (value: File) => {
        if (!value) return true;
        return value && value.size <= VIDEO_FILE_SIZE;
      }
    )
    .required('Video field name is required'),
  materials: yup
    .mixed()
    .test(
      'fileSize',
      `File size is too large, maximum size is ${helpers.transformBytes(MATERIAL_FILE_SIZE)}`,
      (values: File[]) => {
        if (!values) return true;
        return values && values.every(value => value.size <= MATERIAL_FILE_SIZE);
      }
    )
    .optional(),
});

export default LessonFormSchema;
