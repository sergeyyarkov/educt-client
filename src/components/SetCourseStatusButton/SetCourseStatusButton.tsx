import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { CourseStatusEnum } from '@educt/enums';
import { useSetCourseStatus } from '@educt/hooks/queries';

type SetCourseStatusButtonPropsType = {
  courseId: string;
  currentStatus: CourseStatusEnum;
  loadingText?: string | undefined;
};

const SetCourseStatusButton: React.FC<SetCourseStatusButtonPropsType> = ({
  courseId,
  currentStatus,
  loadingText = 'Wait a second...',
}) => {
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
        loadingText={loadingText}
        leftIcon={<AiOutlineEyeInvisible />}
      >
        Mark as Draft
      </Button>
    ),
    DRAFT: (
      <Button
        onClick={() => handleChangeStatus(CourseStatusEnum.PUBLISHED)}
        isLoading={isLoading}
        loadingText={loadingText}
        leftIcon={<AiOutlineEye />}
      >
        Publish course
      </Button>
    ),
  };

  return Components[status];
};

export default SetCourseStatusButton;
