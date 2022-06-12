import * as helpers from '@educt/helpers';
import yup from '@educt/schema';

export const VIDEO_FILE_SIZE = 5000 * 1024 * 1024;
export const MATERIAL_FILE_SIZE = 100000 * 1024;
export const DESCRIPTION_MAX_LENGTH = 250;

const CreateLessonFormSchema = yup
  .object({
    title: yup.string().required('Title field name is required').max(90, 'Title must be at most 90 characters'),
    description: yup
      .string()
      .required('Description field name is required')
      .max(DESCRIPTION_MAX_LENGTH, 'Description must be at most 250 characters'),
    duration: yup.string().required('Duration field name is required'),
    video: yup
      .mixed<File>()
      .test('fileSize', `File size is too large, maximum size is ${helpers.transformBytes(VIDEO_FILE_SIZE)}`, value =>
        !value ? true : value.size <= VIDEO_FILE_SIZE
      )
      .optional(),
    linked_video_url: yup.string().matches(new RegExp('^(http|https|ftp)://'), 'URL is incorrect'),
    materials: yup
      .mixed<File[]>()
      .test(
        'fileSize',
        `File size is too large, maximum size is ${helpers.transformBytes(MATERIAL_FILE_SIZE)}`,
        values => (!values ? true : values.every(value => value.size <= MATERIAL_FILE_SIZE))
      )
      .optional(),
  })
  .required();

const EditLessonFormSchema = CreateLessonFormSchema.shape({
  video: yup
    .mixed<File>()
    .test('fileSize', `File size is too large, maximum size is ${helpers.transformBytes(VIDEO_FILE_SIZE)}`, value =>
      !value ? true : value.size <= VIDEO_FILE_SIZE
    )
    .optional(),
});

export { CreateLessonFormSchema, EditLessonFormSchema };
