import React from 'react';
import { Table, Tbody, Input, InputGroup, InputLeftElement, Flex, Box, Text } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';

/**
 * Components
 */
import AddStudentsModal from '@educt/components/Modals/AddStudentsModal';
import EditUserModal from '@educt/components/Modals/EditUserModal';
import { AddButton } from '@educt/components/Buttons';
import BulkActionsMenu from './BulkActionsMenu';
import StudentTableHead from './StudentTableHead';

/**
 * Types
 */
import type { StudentTableRowPropsType } from './StudentTableRow';
import type { ICourse, IUser } from '@educt/interfaces';

/**
 * Hooks
 */
import { useCallback, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useDetachStudents } from '@educt/hooks/queries';
import { useDeleteUser } from '@educt/hooks/queries';

type StudentTableListPropsType = {
  render: React.FC<StudentTableRowPropsType>;
  course: Omit<ICourse, 'students_count' | 'likes_count' | 'lessons_count'>;
};

const StudentTableList: React.FC<StudentTableListPropsType> = props => {
  const { render: Row, course } = props;
  const [rows, setRows] = useState<ICourse['students']>(props.course.students);
  const [selected, setSelected] = useState<ICourse['students']>([]);
  const [search, setSearch] = useState<string>('');
  const [editing, setEditing] = useState<ICourse['students'][number] | null>(null);
  const filteredRows = !search
    ? rows
    : rows.filter(s => s.fullname.toLowerCase().includes(search) || s.email.toLowerCase().includes(search));

  /**
   * Add students modal
   */
  const {
    isOpen: isOpenAddStudentModal,
    onOpen: onOpenAddStudentModal,
    onClose: onCloseAddStudentModal,
  } = useDisclosure();

  /**
   * Edit student modal
   */
  const {
    isOpen: isOpenEditStudentModal,
    onOpen: onOpenEditStudentModal,
    onClose: onCloseEditStudentModal,
  } = useDisclosure();
  const { deleteUser } = useDeleteUser();
  const { detachStudents } = useDetachStudents();

  const isEmptyRows = rows.length === 0 || filteredRows.length === 0;
  const isEmptySelected = selected.length === 0;
  const isRowSelected = (student: ICourse['students'][number]) => {
    return !!selected.find(selected => selected.id === student.id);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(rows);
      return;
    }

    setSelected([]);
  };

  const handleSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, student: ICourse['students'][number]) => {
      if (event.target.checked) {
        setSelected(prev => [...prev, student]);
        return;
      }

      setSelected(prev => prev.filter(selected => selected.id !== student.id));
    },
    []
  );

  const handleDelete = (id: string) => {
    return async () => {
      try {
        const deletedStudent = await deleteUser(id);
        setRows(prev => prev.filter(student => student.id !== deletedStudent.id));
        setSelected(prev => prev.filter(selected => selected.id !== id));
      } catch (error) {
        console.error(error);
      }
    };
  };

  const handleEdit = (student: ICourse['students'][number]) => {
    return () => {
      setEditing(student);
      onOpenEditStudentModal();
    };
  };

  const handleRemove = (id: string) => {
    return async () => {
      try {
        await detachStudents(course.id, [id]);
        setRows(prev => prev.filter(student => student.id !== id));
        setSelected(prev => prev.filter(selected => selected.id !== id));
      } catch (error) {
        console.error(error);
      }
    };
  };

  const onRemoved = (removedStudents: ICourse['students']) => {
    setSelected(prev =>
      prev.filter(selected => removedStudents.every(removedStudent => selected.id !== removedStudent.id))
    );
  };

  const onAdded = (users: IUser[]) => {
    setRows(prev => [...prev, ...users]);
  };

  const onEdited = (editedUser: IUser) => {
    setRows(prev => prev.map(student => (student.id === editedUser.id ? { ...editedUser } : student)));
  };

  return (
    <Box>
      <AddStudentsModal
        isOpen={isOpenAddStudentModal}
        onClose={onCloseAddStudentModal}
        course={course}
        currentStudents={rows}
        onAdded={onAdded}
      />
      {editing && (
        <EditUserModal
          user={editing}
          isOpen={isOpenEditStudentModal}
          onClose={onCloseEditStudentModal}
          onEdited={onEdited}
        />
      )}
      <Flex justifyContent='space-between' flexDir={{ base: 'column', lg: 'row' }}>
        <Flex mb='2' alignItems='center'>
          <Box>
            <InputGroup mr='2' borderRadius='lg' h='full'>
              <InputLeftElement pointerEvents='none'>
                <MdSearch color='gray.300' />
              </InputLeftElement>
              <Input value={search} size='sm' onChange={handleSearch} type='text' placeholder='Search for student...' />
            </InputGroup>
          </Box>
        </Flex>
        <Flex alignItems='center' justifyContent='space-between' pr={{ base: '8px', lg: '0' }}>
          {!isEmptySelected && (
            <>
              <Text mr='4'>
                You have selected <b>{selected.length}</b> student(s).
              </Text>
              <BulkActionsMenu
                courseId={course.id}
                selected={selected}
                rows={rows}
                setRows={setRows}
                onRemoved={onRemoved}
              />
            </>
          )}
          <AddButton onClick={onOpenAddStudentModal} />
        </Flex>
      </Flex>
      <Table borderRadius='lg' mt='2'>
        <StudentTableHead onSelectAll={handleSelectAll} />
        <Tbody>
          {filteredRows.map(student => (
            <Row
              key={student.id}
              student={student}
              isSelected={isRowSelected(student)}
              onSelect={handleSelect}
              actions={{
                onDelete: handleDelete,
                onEdit: handleEdit,
                onRemove: handleRemove,
              }}
            />
          ))}
        </Tbody>
      </Table>
      {isEmptyRows && (
        <Box textAlign='center' m='6'>
          <Text color='gray.500' userSelect='none'>
            Cannot find any user.
          </Text>
        </Box>
      )}
      <Text mt='4' fontSize='sm' color='gray.500'>
        {rows.length} student(s)
      </Text>
    </Box>
  );
};

export default StudentTableList;
