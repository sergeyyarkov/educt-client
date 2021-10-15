import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
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
