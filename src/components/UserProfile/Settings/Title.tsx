import React from 'react';
import { Box, BoxProps, Heading } from '@chakra-ui/react';

export interface ITitleProps {
  title?: string | undefined;
}

const Title: React.FC<ITitleProps & BoxProps> = props => {
  return (
    <Box minW='3xs' {...props}>
      <Heading as='h2' fontWeight={'semibold'} fontSize={'lg'}>
        {props.title}
      </Heading>
    </Box>
  );
};

export { Title };
