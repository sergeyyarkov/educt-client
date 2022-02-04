import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import type { IAboutProps } from '.';

const About: React.FC<IAboutProps> = ({ about }) => {
  return (
    <Box>
      <Text fontSize={'sm'}>
        {about ? (
          about
        ) : (
          <Text as='span' color='gray.500' userSelect={'none'}>
            No description provided
          </Text>
        )}
      </Text>
    </Box>
  );
};

export { About };
