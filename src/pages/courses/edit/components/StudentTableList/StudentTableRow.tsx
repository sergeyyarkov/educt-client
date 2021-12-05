import React, { memo } from 'react';
import { Tr } from '@chakra-ui/react';

/**
 * Cells
 */
import { CheckBoxCell, InfoCell, RegisteredCell, ActionsCell } from './Cells';
import { ICourse } from '@educt/interfaces';

export type StudentTableRowPropsType = {
  isSelected: boolean;
  student: ICourse['students'][number];
  onSelect: (e: React.ChangeEvent<HTMLInputElement>, student: ICourse['students'][number]) => void;
};

const StudentTableItem: React.FC<StudentTableRowPropsType> = ({ student, isSelected, onSelect }) => {
  return (
    <Tr>
      <CheckBoxCell student={student} isSelected={isSelected} onSelect={onSelect} />
      <InfoCell id={student.id} fullname={student.fullname} email={student.email} />
      <RegisteredCell registered={student.created_at} />
      <ActionsCell id={student.id} />
    </Tr>
  );
};

export default memo(StudentTableItem);
