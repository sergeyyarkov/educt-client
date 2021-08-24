import React from 'react';
import { Flex, Box, Text, Heading } from '@chakra-ui/react';
import { MdSchool } from 'react-icons/md';

const AppName: React.FC = () => {
  return (
    <Flex alignItems='center'>
      <Box mr='4'>
        <Box as={MdSchool} color='blue.500' size='36px' />
      </Box>
      <Box lineHeight='1'>
        <Heading as='p' fontSize='2xl'>
          App name
        </Heading>
        <Text as='small'>App description</Text>
      </Box>
    </Flex>
  );
};

export default AppName;
