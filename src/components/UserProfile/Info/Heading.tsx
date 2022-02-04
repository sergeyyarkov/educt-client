import React from 'react';
import UserBadge from '@educt/components/UserBadge';
import { Flex, Box, Heading as ChakraHeading } from '@chakra-ui/react';
import type { IHeadingProps } from '.';

const Heading: React.FC<IHeadingProps> = ({ fullname, roles }) => {
  return (
    <Flex justifyContent={{ base: 'center', md: 'flex-start' }} mt={{ base: '5', md: '0' }}>
      <ChakraHeading as='h2' fontSize={'xl'} fontWeight={'bold'}>
        {fullname}&nbsp;&bull;&nbsp;
      </ChakraHeading>
      <Box>
        <UserBadge roles={roles} />
      </Box>
    </Flex>
  );
};

export { Heading };
