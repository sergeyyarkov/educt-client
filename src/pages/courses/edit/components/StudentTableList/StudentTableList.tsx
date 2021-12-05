import React from 'react';
import { Table, Tbody, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { DeleteIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { MdSearch, MdImportExport, MdRemove } from 'react-icons/md';

import AddStudentsModal from '@educt/components/Modals/AddStudentsModal';
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
import BulkActionsMenu from './BulkActionsMenu';

type StudentTableListPropsType = {
  render: React.FC<StudentTableRowPropsType>;
  students: ICourse['students'];
};

const StudentTableList: React.FC<StudentTableListPropsType> = ({ render: Row, students }) => {
  const [rows, setRows] = useState<ICourse['students']>(students);
  const [selected, setSelected] = useState<ICourse['students']>([]);
  const [search, setSearch] = useState<string>('');

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
      <Box textAlign='center' mt='10'>
        <Text>There are no students in the course yet</Text>
        <AddStudentsModal />
      </Box>
    );
  }

  return (
    <Box>
      <Flex justifyContent='space-between' flexDir={{ base: 'column', lg: 'row' }}>
        <Flex mb='2'>
          <InputGroup mr='2'>
            <InputLeftElement pointerEvents='none' children={<MdSearch color='gray.300' />} />
            <Input value={search} onChange={handleSearch} type='text' placeholder='Search for student...' />
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
          <Button variant='outline' colorScheme='blue'>
            Add new
          </Button>
        </Flex>
      </Flex>
      <Table overflowX='hidden' borderRadius='lg' mt='2'>
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
    </Box>
  );
};

export default StudentTableList;
