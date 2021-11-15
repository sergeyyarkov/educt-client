import React from 'react';

/**
 * Types
 */
import { IUser } from '@educt/interfaces';

export type StudentItemPropsType = {
  student: Pick<IUser, 'id' | 'first_name' | 'fullname' | 'last_name' | 'email'>;
};

const StudentItem: React.FC<StudentItemPropsType> = ({ student }) => {
  return <div>{student.fullname}</div>;
};

export default StudentItem;
