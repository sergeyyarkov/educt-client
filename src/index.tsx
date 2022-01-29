import * as React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import App from './App';
import { theme } from './theme';
import { RootStoreProvider, SocketContextProvider } from './providers';

ReactDOM.render(
  <>
    <ColorModeScript />
    <RootStoreProvider>
      <ChakraProvider theme={theme}>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </ChakraProvider>
    </RootStoreProvider>
  </>,
  document.getElementById('root')
);
