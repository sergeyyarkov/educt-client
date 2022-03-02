import React from 'react';
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';

const Card: React.FC<BoxProps> = (props: BoxProps) => (
  <Box
    bg={useColorModeValue('white', 'gray.700')}
    py='8'
    px={{ base: '4', md: '10' }}
    shadow='base'
    rounded={{ sm: 'lg' }}
    {...props}
  />
);

export default Card;
