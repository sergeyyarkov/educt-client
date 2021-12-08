import React from 'react';
import { ButtonProps, Button } from '@chakra-ui/button';
import { CourseStatusEnum } from '@educt/enums';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

/**
 * Hooks
 */
import { useState } from 'react';
import { useSetCourseStatus } from '@educt/hooks/queries';

interface IStatusButtonProps extends ButtonProps {
  courseId: string;
  currentStatus: CourseStatusEnum;
  loadingText?: string | undefined;
}
export const StatusButton: React.FC<IStatusButtonProps> = props => {
  const { courseId, currentStatus, loadingText, ...btnProps } = props;
  const [status, setStatus] = useState<keyof typeof CourseStatusEnum>(currentStatus);
  const { setCourseStatus, isLoading } = useSetCourseStatus();

  const handleChangeStatus = async (newStatus: CourseStatusEnum) => {
    await setCourseStatus(courseId, newStatus);
    setStatus(newStatus);
  };

  const Components: { [k in keyof typeof CourseStatusEnum]: any } = {
    PUBLISHED: (
      <Button
        onClick={() => handleChangeStatus(CourseStatusEnum.DRAFT)}
        isLoading={isLoading}
        loadingText={loadingText || 'Saving...'}
        leftIcon={<AiOutlineEyeInvisible />}
        size='sm'
        variant='outline'
        {...btnProps}
      >
        Mark as Draft
      </Button>
    ),
    DRAFT: (
      <Button
        onClick={() => handleChangeStatus(CourseStatusEnum.PUBLISHED)}
        isLoading={isLoading}
        loadingText={loadingText || 'Saving...'}
        leftIcon={<AiOutlineEye />}
        size='sm'
        variant='outline'
        {...btnProps}
      >
        Publish course
      </Button>
    ),
  };

  return Components[status];
};
