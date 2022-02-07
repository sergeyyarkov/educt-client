import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Box, BoxProps, Link } from '@chakra-ui/react';
import LogoIcon from '@educt/components/Logo';

const Logo: React.FC<BoxProps> = props => (
  <Box {...props}>
    <Link as={ReactRouterLink} to='/' _focus={{ outline: 'none' }}>
      <LogoIcon h='10' />
    </Link>
  </Box>
);

export { Logo };
