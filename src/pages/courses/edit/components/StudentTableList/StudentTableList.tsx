import React from 'react';
import { Table, Tbody, Button, Input, InputGroup, InputLeftElement, Flex, Box, Text } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';

import AddStudentsModal from '@educt/components/Modals/AddStudentsModal';
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
import { AddIcon } from '@chakra-ui/icons';

type StudentTableListPropsType = {
  render: React.FC<StudentTableRowPropsType>;
  students: ICourse['students'];
};

const StudentTableList: React.FC<StudentTableListPropsType> = ({ render: Row, students }) => {
  const [rows, setRows] = useState<ICourse['students']>(students);
  const [selected, setSelected] = useState<ICourse['students']>([]);
  const [search, setSearch] = useState<string>('');
  const {
    isOpen: isOpenAddStudentModal,
    onOpen: onOpenAddStudentModal,
    onClose: onCloseAddStudentModal,
  } = useDisclosure();

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

  if (rows.length === 0) {
    return (
      <>
        <AddStudentsModal isOpen={isOpenAddStudentModal} onClose={onCloseAddStudentModal} />
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
      <AddStudentsModal isOpen={isOpenAddStudentModal} onClose={onCloseAddStudentModal} />
      <Flex justifyContent='space-between' flexDir={{ base: 'column', lg: 'row' }}>
        <Flex mb='2'>
          <InputGroup mr='2'>
            <InputLeftElement pointerEvents='none' children={<MdSearch color='gray.300' />} />
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
          <Button onClick={onOpenAddStudentModal} leftIcon={<AddIcon />} size='sm' variant='outline'>
            Add new
          </Button>
        </Flex>
      </Flex>
      <Table overflow='hidden' borderRadius='lg' mt='2'>
        <StudentTableHead onSelectAll={handleSelectAll} />
        <Tbody>
          {rows.map(student => (
            <Row
              key={student.id}
              student={student}
              isSelected={!!selected.find(s => s.id === student.id)}
              onSelect={handleSelect}
            />
          ))}
        </Tbody>
      </Table>
      <Text mt='4' fontSize='sm' color='gray.500'>
        {students.length} students
      </Text>
    </Box>
  );
};

export default StudentTableList;
