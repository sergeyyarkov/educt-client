import React, { useState } from 'react';

import BaseModal from '@educt/components/Modal';
import { MdGroup } from 'react-icons/md';
import { UserRoleEnum } from '@educt/enums';
import SelectStudentsInput from '@educt/components/SelectStudentsInput';
import { ICourse, IUser } from '@educt/interfaces';
import { CourseServiceInstance } from '@educt/services';
import { useToast } from '@chakra-ui/react';
import useIsMountedRef from '@educt/hooks/useIsMountedRef';

type AddStudentsModalPropsType = {
  course: Omit<ICourse, 'students_count' | 'likes_count' | 'lessons_count'>;
  currentStudents: ICourse['students'];
  isOpen: boolean;
  onClose: () => void;
  onAdded: (users: Array<IUser>) => void;
};

const AddStudentsModal: React.FC<AddStudentsModalPropsType> = ({
  isOpen,
  onClose,
  onAdded,
  currentStudents,
  course,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isMountedRef = useIsMountedRef();
  const [students, setStudents] = useState<Array<IUser>>([]);
  const toast = useToast();

  const handleSelectStudents = (students: Array<IUser>) => setStudents(students);
  const handleAttachStudents = async () => {
    if (students.length !== 0) {
      try {
        setIsLoading(true);
        const ids = students.map(s => s.id);
        await CourseServiceInstance.attachStudentsList(course.id, ids);

        toast({ title: 'Students added.', status: 'info' });
        onAdded(students);
        onClose();
      } catch (error) {
        console.error(error);
      } finally {
        if (isMountedRef.current) setIsLoading(false);
      }
    }
  };

  return (
    <BaseModal
      icon={MdGroup}
      heading='Add new students'
      description='Attach new students to current course.'
      confirmText='Add students'
      isOpen={isOpen}
      onClose={onClose}
      onProceed={handleAttachStudents}
      isLoading={isLoading}
      loadingText='Saving...'
    >
      <SelectStudentsInput
        currentStudents={currentStudents}
        onSelect={selected => handleSelectStudents(selected)}
        placeholder='Search for students...'
        searchParams={{ role: UserRoleEnum.STUDENT }}
      />
    </BaseModal>
  );
};

export default AddStudentsModal;
