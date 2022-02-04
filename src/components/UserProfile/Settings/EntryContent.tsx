import React from 'react';
import { Flex } from '@chakra-ui/react';

const EntryContent: React.FC = props => {
  return (
    <Flex flexDir={'column'} w='full' mt={{ base: '6', md: '0' }}>
      {props.children}
    </Flex>
  );
};

export { EntryContent };
