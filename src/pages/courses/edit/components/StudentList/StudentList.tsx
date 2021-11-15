import React from 'react';
import { Stack, Box, Text, Button } from '@chakra-ui/react';

/**
 * Types
 */
import { StudentItemPropsType } from './StudentItem';
import { ICourse } from '@educt/interfaces';

type StudentListPropsType = {
  render: React.FC<StudentItemPropsType>;
  students: ICourse['students'];
};

const StudentList: React.FC<StudentListPropsType> = ({ render: Item, students }) => {
  return (
    <Box>
      {students.length !== 0 ? (
        <Stack>
          {students.map(student => (
            <Item key={student.id} student={student} />
          ))}
        </Stack>
      ) : (
        <Box textAlign='center' mt='10'>
          <Text>There are no students in the course yet</Text>
          <Button mt='3' size='sm' colorScheme='blue' variant='outline'>
            Add student
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default StudentList;
