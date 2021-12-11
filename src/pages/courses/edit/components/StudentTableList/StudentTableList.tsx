import React from 'react';
import { Table, Tbody, Button, Input, InputGroup, InputLeftElement, Flex, Box, Text, useToast } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';
import AddStudentsModal from '@educt/components/Modals/AddStudentsModal';
import { BeatLoader } from 'react-spinners';
import { AddButton } from '@educt/components/Buttons';
import BulkActionsMenu from './BulkActionsMenu';
import StudentTableHead from './StudentTableHead';

/**
 * Types
 */
import type { StudentTableRowPropsType } from './StudentTableRow';
import type { ICourse } from '@educt/interfaces';

/**
 * Hooks
 */
import { useCallback, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { UserServiceInstance } from '@educt/services';

type StudentTableListPropsType = {
  render: React.FC<StudentTableRowPropsType>;
  course: Omit<ICourse, 'students_count' | 'likes_count' | 'lessons_count'>;
};

const StudentTableList: React.FC<StudentTableListPropsType> = props => {
  const { render: Row, course } = props;
  const { students } = course;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<ICourse['students']>(students);
  const [selected, setSelected] = useState<ICourse['students']>([]);
  const [search, setSearch] = useState<string>('');
  const {
    isOpen: isOpenAddStudentModal,
    onOpen: onOpenAddStudentModal,
    onClose: onCloseAddStudentModal,
  } = useDisclosure();
  const toast = useToast();

  /**
   * Search for a student by input
   */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setRows([
      ...students.filter(
        s => s.fullname.toLowerCase().includes(e.target.value) || s.email.toLowerCase().includes(e.target.value)
      ),
    ]);
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
        setIsLoading(true);
        const { data } = await UserServiceInstance.delete(id);
        toast({ title: 'Student deleted', status: 'info' });
        setRows(prev => prev.filter(s => s.id !== data.id));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
  };

  /**
   * Edit student handler
   */
  const handleEdit = (id: string) => {
    return () => {
      console.log(`editing id: ${id}`);
    };
  };

  /**
   * Remove from course student handler
   */
  const handleRemove = (id: string) => {
    return () => {
      console.log(`removing id: ${id}`);
    };
  };

  if (rows.length === 0) {
    return (
      <>
        <AddStudentsModal
          isOpen={isOpenAddStudentModal}
          onClose={onCloseAddStudentModal}
          course={course}
          currentStudents={rows}
          onAdded={users => setRows(prev => [...prev, ...users])}
        />
        <Box textAlign='center' mt='10'>
          <Text>There are no students in the course yet</Text>
          <Button mt='2' onClick={onOpenAddStudentModal} size='sm' colorScheme='blue' variant='outline'>
            Add student
          </Button>
        </Box>
      </>
    );
  }

  return (
    <Box>
      <AddStudentsModal
        isOpen={isOpenAddStudentModal}
        onClose={onCloseAddStudentModal}
        course={course}
        currentStudents={rows}
        onAdded={users => setRows(prev => [...prev, ...users])}
      />
      <Flex justifyContent='space-between' flexDir={{ base: 'column', lg: 'row' }}>
        <Flex mb='2'>
          <InputGroup mr='2' borderRadius='lg'>
            <InputLeftElement pointerEvents='none'>
              <MdSearch color='gray.300' />
            </InputLeftElement>
            <Input value={search} size='sm' onChange={handleSearch} type='text' placeholder='Search for student...' />
          </InputGroup>
        </Flex>

        <Flex alignItems='center' justifyContent='space-between' pr={{ base: '8px', lg: '0' }}>
          {selected.length !== 0 && (
            <>
              <Text mr='4'>
                You have selected <b>{selected.length}</b> student(s).
              </Text>
              <BulkActionsMenu selected={selected} rows={rows} setRows={setRows} />
            </>
          )}
          <AddButton onClick={onOpenAddStudentModal} />
        </Flex>
      </Flex>
      {isLoading && (
        <Flex alignItems='center' justifyContent={'flex-end'}>
          <BeatLoader size={6} color='gray' />
          <Text fontSize='sm' ml='3' mt='2' mb='2'>
            Loading...
          </Text>
        </Flex>
      )}
      <Table overflow='hidden' borderRadius='lg' mt='2'>
        <StudentTableHead onSelectAll={handleSelectAll} />
        <Tbody>
          {rows.map(student => (
            <Row
              key={student.id}
              student={student}
              isSelected={!!selected.find(s => s.id === student.id)}
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
      <Text mt='4' fontSize='sm' color='gray.500'>
        {students.length} student(s)
      </Text>
    </Box>
  );
};

export default StudentTableList;
