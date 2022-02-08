import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export interface IInfoProps {
  fullname: string;
  lastMessage: string;
}

const Info: React.FC<IInfoProps> = ({ fullname, lastMessage }) => {
  return (
    <Box ml='4'>
      <Text fontWeight={'semibold'}>
        {fullname} <br />
        <Text as={'span'} fontWeight='normal' fontSize={'sm'} color='gray.500'>
          {lastMessage}
        </Text>
      </Text>
    </Box>
  );
};

export { Info };
