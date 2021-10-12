import { Badge } from '@chakra-ui/layout';
import { CourseStatusEnum } from 'enums';
import React from 'react';

type CourseStatusBadgeProps = {
  status: CourseStatusEnum;
};

const CourseStatusBadge: React.FC<CourseStatusBadgeProps> = ({ status }) => {
  return (
    <>
      {(() => {
        switch (status) {
          case CourseStatusEnum.PUBLISHED:
            return (
              <Badge variant='subtle' colorScheme='green'>
                Published
              </Badge>
            );
          case CourseStatusEnum.DRAFT:
            return <Badge variant='subtle'>Draft</Badge>;
          default:
            return null;
        }
      })()}
    </>
  );
};

export default CourseStatusBadge;
