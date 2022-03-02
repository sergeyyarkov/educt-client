import React from 'react';
import { Box, Text as ChakraText, useColorModeValue } from '@chakra-ui/react';
import { useMessageContext } from './context';

export interface ITextProps {
  content: string;
  time: string;
}

const Text: React.FC<ITextProps> = ({ content, time }) => {
  const { isMyMessage } = useMessageContext();

  const bgColor = !isMyMessage ? useColorModeValue('gray.50', 'gray.700') : useColorModeValue('gray.100', 'gray.600');

  return (
    <Box mx={'4'} maxW={'450px'} bg={bgColor} borderRadius='3xl' px='6' py='3'>
      <ChakraText fontSize={'15px'} wordBreak='break-all'>
        {content}
        <Box
          as='time'
          userSelect={'none'}
          position={'relative'}
          left='10px'
          float='right'
          top='8px'
          alignSelf={'flex-end'}
          color='gray.500'
          fontSize={'xs'}
          dateTime={time}
        >
          {time}
        </Box>
      </ChakraText>
    </Box>
  );
};

export { Text };
