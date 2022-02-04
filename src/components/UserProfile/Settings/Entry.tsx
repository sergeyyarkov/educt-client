import React from 'react';
import { Flex } from '@chakra-ui/react';

const Entry: React.FC = props => {
  return <Flex flexDir={{ base: 'column', md: 'row' }}>{props.children}</Flex>;
};

export { Entry };
