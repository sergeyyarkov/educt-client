import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import type { IAboutProps } from '.';

const About: React.FC<IAboutProps> = () => {
  return (
    <Box>
      <Text fontSize={'sm'}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A quibusdam sapiente quisquam vero harum ipsam officiis
        rerum. Cum, excepturi nulla.
      </Text>
    </Box>
  );
};

export { About };
