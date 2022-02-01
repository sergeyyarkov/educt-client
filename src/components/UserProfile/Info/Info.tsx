import React from 'react';
import { Box } from '@chakra-ui/react';

const Info: React.FC = props => {
  return (
    <Box ml={{ base: '0', md: '10' }} {...props}>
      {props.children}
    </Box>
  );
};

export { Info };
