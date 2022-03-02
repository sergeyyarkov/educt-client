import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export interface ITimeProps {
  time: string;
}

const Time: React.FC<ITimeProps> = ({ time }) => {
  return (
    <Box alignSelf={'flex-end'} ml='auto'>
      <Text as='span' color='gray.500'>
        {time}
      </Text>
    </Box>
  );
};

export { Time };
