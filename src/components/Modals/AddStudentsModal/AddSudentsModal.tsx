import React from 'react';
import { MdGroup } from 'react-icons/md';
import BaseModal from '@educt/components/Modal';
import SelectStudentsInput from '@educt/components/SelectStudentsInput';
import { UserRoleEnum } from '@educt/enums';

/**
 * Types
 */
import { ICourse, IUser } from '@educt/interfaces';

/**
 * Hooks
 */
import { useState } from 'react';
import { useAttachStudents } from '@educt/hooks/queries';

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
  const { attachStudents, isLoading } = useAttachStudents();
  const [selected, setSelected] = useState<Array<IUser>>([]);

  const handleSelectStudents = (students: Array<IUser>) => setSelected(students);

  const handleAttachStudents = async () => {
    if (selected.length !== 0) {
      try {
        const ids = selected.map(s => s.id);
        await attachStudents(course.id, ids);
        onAdded(selected);
        onClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <BaseModal
      icon={MdGroup}
      heading='Add new students'
      description='Attach new students to current course.'
      confirmText='Add'
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
