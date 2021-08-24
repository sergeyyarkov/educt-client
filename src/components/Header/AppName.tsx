import React from 'react';
import { Flex, Box, Text, Heading } from '@chakra-ui/react';
import { MdSchool } from 'react-icons/md';
import config from '../../config';

const AppName: React.FC = () => {
  return (
    <Flex alignItems='center'>
      <Box mr='4'>
        <Box as={MdSchool} color='blue.500' size='36px' />
      </Box>
      <Box>
        <Heading as='p' fontSize='2xl' lineHeight='1'>
          {config.metaData.appName}
        </Heading>
        <Text as='small'>{config.metaData.appDescription}</Text>
      </Box>
    </Flex>
  );
};

export default AppName;
