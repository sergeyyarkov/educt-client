import * as React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import App from './App';
import { theme } from './theme';
import { RootStoreProvider } from './providers';

ReactDOM.render(
  <>
    <ColorModeScript />
    <RootStoreProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </RootStoreProvider>
  </>,
  document.getElementById('root')
);
