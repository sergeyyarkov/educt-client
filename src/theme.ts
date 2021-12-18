import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        scrollbarWidth: 'thin',
        scrollbarColor: '#000',
      },
      '::-webkit-scrollbar': {
        width: '5px',
        height: '5px',
      },
      '::-webkit-scrollbar-track': {
        backgroundColor: 'gray.100',
        borderRadius: '100px',
      },
      '::-webkit-scrollbar-thumb': {
        background: 'blue.600',
        borderRadius: '100px',
      },
    },
  },
});
