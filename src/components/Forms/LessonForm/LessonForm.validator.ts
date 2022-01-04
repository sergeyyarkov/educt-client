import { VideoSupportedFormatsEnum } from '@educt/enums';
import yup from '@educt/schema';

const VIDEO_FILE_SIZE = 5000 * 1024 * 1024;
const MATERIAL_FILE_SIZE = 10000 * 1024;

const LessonFormSchema = yup.object().shape({
  title: yup.string().required('Title field name is required').max(90, 'Title must be at most 90 characters'),
  description: yup
    .string()
    .required('Description field name is required')
    .max(250, 'Description must be at most 250 characters'),
  duration: yup.string().required('Duration field name is required'),
  video: yup
    .mixed()
    .test('fileSize', 'File size is too large', (value: File) => {
      if (!value) return true;
      return value && value.size <= VIDEO_FILE_SIZE;
    })
    .test('fileFormat', 'This file format is not supported', (value: File) => {
      if (!value) return true;
      return value && Object.values(VideoSupportedFormatsEnum).includes(value.type as VideoSupportedFormatsEnum);
    })
    .required('Video field name is required'),
  // materials: yup
  //   .mixed()
  //   .test('fileSize', 'File size is too large', (value: File) => {
  //     if (!value) return true;
  //     return value && value.size <= VIDEO_FILE_SIZE;
  //   })
  //   .test('fileFormat', 'This file format is not supported', (value: File) => {
  //     if (!value) return true;
  //     return value && VIDEO_SUPPORTED_FORMATS.includes(value.type);
  //   }),
});

export default LessonFormSchema;
