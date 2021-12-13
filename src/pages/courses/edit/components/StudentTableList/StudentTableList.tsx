import React from 'react';
import { Table, Tbody, Input, InputGroup, InputLeftElement, Flex, Box, Text } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';
import AddStudentsModal from '@educt/components/Modals/AddStudentsModal';
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
  const {
    isOpen: isOpenAddStudentModal,
    onOpen: onOpenAddStudentModal,
    onClose: onCloseAddStudentModal,
  } = useDisclosure();
  const { deleteUser } = useDeleteUser();
  const { detachStudents } = useDetachStudents();

  const isEmptyRows = rows.length === 0;
  const isEmptySelected = selected.length === 0;
  const isRowSelected = (student: ICourse['students'][number]) => !!selected.find(s => s.id === student.id);

  /**
   * Search for a student by input
   */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setRows(
      props.course.students.filter(
        s => s.fullname.toLowerCase().includes(e.target.value) || s.email.toLowerCase().includes(e.target.value)
      )
    );
  };

  const onRemoved = (removedStudents: ICourse['students']) => {
    setSelected(prev => prev.filter(s => removedStudents.every(r => s.id !== r.id)));
  };

  const onAdded = (users: IUser[]) => {
    setRows(prev => [...prev, ...users]);
  };

  /**
   * Select all students in a table
   */
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected(rows);
      return;
    }

    setSelected([]);
  };

  /**
   * Select a student with checkbox
   */
  const handleSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>, student: ICourse['students'][number]) => {
    if (e.target.checked) {
      setSelected(prev => [...prev, student]);
      return;
    }

    setSelected(prev => prev.filter(s => s.id !== student.id));
  }, []);

  /**
   * Delete student handler
   */
  const handleDelete = (id: string) => {
    return async () => {
      try {
        const deleted = await deleteUser(id);
        setRows(prev => prev.filter(s => s.id !== deleted.id));
      } catch (error) {
        console.error(error);
      }
    };
  };

  /**
   * Edit student handler
   */
  const handleEdit = (id: string) => {
    return () => {
      // TODO open the edit user modal
      console.log(`editing id: ${id}`);
    };
  };

  /**
   * Remove from course student handler
   */
  const handleRemove = (id: string) => {
    return async () => {
      try {
        await detachStudents(course.id, [id]);
        setRows(prev => prev.filter(s => s.id !== id));
      } catch (error) {
        console.error(error);
      }
    };
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
          {rows.map(student => (
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
