import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

const Base: React.FC<FlexProps> = props => {
  return (
    <Flex flexDir={{ base: 'column', md: 'row' }} {...props}>
      {props.children}
    </Flex>
  );
};

export { Base };
